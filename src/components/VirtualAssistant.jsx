import { useEffect, useRef, useState } from 'react'
import { useConversationControls, useConversationInput, useConversationMode, useConversationStatus } from '@elevenlabs/react'
import * as api from '../api/autofranciaApi.js'

const IDLE = 'idle'
const CONNECTING = 'connecting'
const ACTIVE = 'active'

export default function VirtualAssistant({ brand, modelName, name, dial, phone, intent, date, time, theme }) {
  const { startSession, endSession } = useConversationControls()
  const { status, message: statusMessage } = useConversationStatus()
  const { isMuted, setMuted } = useConversationInput()
  const { isSpeaking, isListening } = useConversationMode()
  const [phase, setPhase] = useState(IDLE)
  const [error, setError] = useState('')
  const [conversationId, setConversationId] = useState('')
  const activeRef = useRef(false)
  const busyRef = useRef(false)

  const valid = !!brand && !!modelName && name.trim().length > 2 && phone.replace(/\D/g, '').length >= 7
  const customerInterest = intent === 'schedule' ? 'Visita al showroom' : 'Información sobre el vehículo'
  const appointmentDate = date || ''
  const appointmentTime = time || ''

  useEffect(() => {
    activeRef.current = status === 'connecting' || status === 'connected'
    if (status === 'connected') setPhase(ACTIVE)
    if (status === 'error') {
      console.error('[AutoFrancia] Claudia connection error', {
        status,
        message: statusMessage || 'ElevenLabs returned a connection error',
      })
      setPhase(IDLE)
      setError('No pudimos iniciar la conversación. Intenta nuevamente.')
      busyRef.current = false
    }
  }, [status, statusMessage])

  useEffect(() => {
    return () => {
      if (activeRef.current) endSession()
    }
  }, [endSession])

  const startClaudia = async () => {
    if (!valid || busyRef.current || activeRef.current) return
    busyRef.current = true
    setError('')
    setPhase(CONNECTING)

    let leadResponse
    try {
      leadResponse = await api.submitLead({
        brand: brand.api,
        intent: 'INFORMATION',
        fullName: name.trim(),
        phoneCountryCode: dial,
        phone: phone.replace(/\D/g, ''),
        model: modelName,
        virtualAssistantUsed: true,
      })
    } catch (cause) {
      logVoiceError('lead_registration', cause)
      busyRef.current = false
      setPhase(IDLE)
      setError('No pudimos registrar tu solicitud. Intenta nuevamente.')
      return
    }

    if (!leadResponse || !leadResponse.leadId) {
      console.error('[AutoFrancia] Claudia lead registration returned no leadId')
      busyRef.current = false
      setPhase(IDLE)
      setError('No pudimos registrar tu solicitud. Intenta nuevamente.')
      return
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('microphone_denied')
      const microphone = await navigator.mediaDevices.getUserMedia({ audio: true })
      microphone.getTracks().forEach((track) => track.stop())

      const tokenResponse = await fetch('/api/elevenlabs-token', { headers: { Accept: 'application/json' }, cache: 'no-store' })
      const tokenData = await tokenResponse.json().catch(() => ({}))
      if (!tokenResponse.ok || !tokenData.token) throw new Error('token_failed')

      setConversationId(tokenData.conversationId || '')
      startSession({
        conversationToken: tokenData.token,
        userId: leadResponse.leadId,
        dynamicVariables: {
          customer_name: name.trim(),
          brand: brand.api,
          model: modelName,
          customer_interest: customerInterest,
          lead_id: leadResponse.leadId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
        },
        onConnect: ({ conversationId: connectedConversationId }) => setConversationId(connectedConversationId || ''),
      })
      busyRef.current = false
    } catch (cause) {
      logVoiceError('microphone_token_or_session', cause)
      busyRef.current = false
      setPhase(IDLE)
      if ((cause && cause.name === 'NotAllowedError') || (cause && cause.message === 'microphone_denied')) {
        setError('Necesitamos acceso al micrófono para hablar con Claudia.')
      } else if (cause && cause.message === 'token_failed') {
        setError('No pudimos conectar con Claudia. Intenta nuevamente.')
      } else {
        setError('No pudimos iniciar la conversación. Intenta nuevamente.')
      }
    }
  }

  const finishClaudia = () => {
    endSession()
    activeRef.current = false
    busyRef.current = false
    setPhase(IDLE)
    setError('')
  }

  const retry = () => {
    setError('')
    startClaudia()
  }

  return (
    <div style={{ marginTop: 'clamp(26px,4vw,40px)', border: '1px solid var(--af-line, rgba(18,16,15,.16))', borderRadius: 4, padding: '20px 22px', background: 'var(--af-surface, #fff)', color: theme.ink }}>
      <p style={{ margin: '0 0 6px', fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 16 }}>Habla con Claudia</p>
      <p style={{ margin: '0 0 16px', fontSize: 13, lineHeight: 1.5, color: 'var(--af-mut, #6E6A65)' }}>Resuelve tus dudas por voz con nuestro asistente virtual.</p>

      {phase === IDLE && (
        <button type="button" onClick={error ? retry : startClaudia} disabled={!valid || busyRef.current} style={buttonStyle(theme, valid)}>
          🎙 Hablar con Claudia
        </button>
      )}

      {phase === CONNECTING && <p style={statusStyle}>Conectando con Claudia…</p>}

      {phase === ACTIVE && (
        <div>
          <p style={{ ...statusStyle, color: theme.accent }}>● Claudia está conectada</p>
          <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--af-mut, #6E6A65)' }}>
            {isListening ? 'Claudia está escuchando…' : isSpeaking ? 'Claudia está respondiendo…' : 'Puedes hablar cuando quieras.'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button type="button" onClick={() => setMuted(!isMuted)} style={secondaryButtonStyle(theme)}>{isMuted ? 'Activar micrófono' : 'Silenciar'}</button>
            <button type="button" onClick={finishClaudia} style={secondaryButtonStyle(theme)}>Finalizar conversación</button>
          </div>
          {conversationId && <span style={{ display: 'none' }} aria-hidden="true">{conversationId}</span>}
        </div>
      )}

      {error && <p role="alert" style={{ margin: phase === IDLE ? '14px 0 0' : 0, fontSize: 13, lineHeight: 1.5, color: '#A43D32' }}>{error}</p>}
    </div>
  )
}

function logVoiceError(stage, cause) {
  console.error('[AutoFrancia] Claudia error', {
    stage,
    name: cause?.name || 'Error',
    message: cause?.message || 'Unknown error',
  })
}

const statusStyle = { margin: 0, fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 14 }

function buttonStyle(theme, valid) {
  return { width: '100%', minHeight: 48, padding: '0 18px', border: 'none', borderRadius: 3, background: valid ? theme.ink : 'var(--af-line, rgba(18,16,15,.12))', color: valid ? theme.bg : 'var(--af-mut, #6E6A65)', fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 14, cursor: valid ? 'pointer' : 'not-allowed' }
}

function secondaryButtonStyle(theme) {
  return { minHeight: 42, padding: '0 16px', border: '1px solid ' + theme.line, borderRadius: 3, background: 'transparent', color: theme.ink, fontFamily: 'Archivo, sans-serif', fontSize: 13, cursor: 'pointer' }
}
