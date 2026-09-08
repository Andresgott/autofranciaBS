import { useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route, Outlet, useLocation, useParams, useOutletContext } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SubmitOverlay from './components/SubmitOverlay.jsx'
import Home from './pages/Home.jsx'
import Intent from './pages/Intent.jsx'
import Info from './pages/Info.jsx'
import Schedule from './pages/Schedule.jsx'
import { BRANDS, getTheme, formatLongDate } from './lib/theme.js'
import * as api from './api/autofranciaApi.js'
import { ConversationProvider } from '@elevenlabs/react'

function Layout() {
  const params = useParams()
  const location = useLocation()

  const brandKey = params.brand && BRANDS[params.brand] ? params.brand : null
  const brand = brandKey ? BRANDS[brandKey] : null
  const intent = location.pathname.endsWith('/info') ? 'info' : location.pathname.endsWith('/schedule') ? 'schedule' : null

  const rootRef = useRef(null)
  const prevBrandRef = useRef(brandKey)
  const prevPathRef = useRef(null)

  const [model, setModel] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [name, setName] = useState('')
  const [dial, setDial] = useState('+591')
  const [phone, setPhone] = useState('')
  const [ui, setUi] = useState('idle')
  const [availability, setAvailability] = useState(null)
  const [loadingAvail, setLoadingAvail] = useState(false)
  const [availError, setAvailError] = useState(false)

  useEffect(() => {
    api.captureAttribution()
  }, [])

  useEffect(() => {
    if (prevPathRef.current !== null && prevPathRef.current !== location.pathname) {
      setDate(null)
      setTime(null)
      setUi('idle')
      if (prevBrandRef.current !== brandKey) {
        setModel(null)
        setAvailability(null)
      }
      window.scrollTo(0, 0)
    }
    prevPathRef.current = location.pathname
    prevBrandRef.current = brandKey
  }, [location.pathname, brandKey])

  const theme = getTheme(brandKey)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.style.setProperty('--af-bg', theme.bg)
    el.style.setProperty('--af-ink', theme.ink)
    el.style.setProperty('--af-mut', theme.mut)
    el.style.setProperty('--af-line', theme.line)
    el.style.setProperty('--af-surface', theme.surface)
    el.style.setProperty('--af-accent', theme.accent)
    document.body.style.background = theme.bg
  }, [theme])

  const loadAvailability = useCallback(() => {
    if (!brand) return
    setLoadingAvail(true)
    setAvailError(false)
    api
      .getAvailability(brand.api)
      .then((res) => {
        setAvailability((res && res.dates) || [])
        setLoadingAvail(false)
      })
      .catch(() => {
        setLoadingAvail(false)
        setAvailError(true)
        setAvailability(null)
      })
  }, [brand])

  useEffect(() => {
    if (intent === 'schedule' && brand && !availability && !loadingAvail) {
      loadAvailability()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent, brand, availability, loadingAvail])

  const modelName = brand && model ? (brand.models.find((m) => m.id === model) || {}).name : ''
  const summaryDate = formatLongDate(date)

  const valid = !!model && name.trim().length > 2 && phone.replace(/\D/g, '').length >= 7 && (intent !== 'schedule' || !!time)

  const [whatsappUrl, setWhatsappUrl] = useState(null)

  const submit = useCallback(() => {
    if (!valid || !brand || ui === 'submitting') return
    setUi('submitting')
    const payload = {
      brand: brand.api,
      intent: intent === 'schedule' ? 'SHOWROOM_APPOINTMENT' : 'INFORMATION',
      fullName: name.trim(),
      phoneCountryCode: dial,
      phone: phone.replace(/\D/g, ''),
      model: modelName,
    }
    if (intent === 'schedule') {
      payload.appointmentDate = date
      payload.appointmentTime = time
    }
    api
      .submitLead(payload)
      .then((res) => {
        setWhatsappUrl(res && res.whatsappUrl ? res.whatsappUrl : null)
        setUi('success')
      })
      .catch((e) => {
        if (e && e.message === 'slot_taken') {
          setUi('slot_taken')
          setTime(null)
          loadAvailability()
        } else {
          setUi('error')
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valid, brand, intent, modelName, date, time, name, dial, phone, ui, loadAvailability])

  useEffect(() => {
    if (ui !== 'success' || !whatsappUrl) return
    const t = setTimeout(() => {
      window.location.href = whatsappUrl
    }, 900)
    return () => clearTimeout(t)
  }, [ui, whatsappUrl])

  const overlay = {
    submitting: { title: 'Estamos registrando tu solicitud…', body: 'Un momento, no cierres esta ventana.' },
    success: {
      title: 'Listo.',
      body:
        intent === 'schedule'
          ? 'Te conectaremos con tu asesor por WhatsApp para confirmar tu visita.'
          : 'Te conectaremos con tu asesor por WhatsApp con la información del modelo.',
    },
    error: { title: 'No pudimos registrar tu solicitud.', body: 'Intenta nuevamente.' },
    slot_taken: { title: 'Este horario ya no está disponible.', body: 'Selecciona otro horario.' },
  }[ui] || { title: '', body: '' }

  const retry = () => (ui === 'slot_taken' ? setUi('idle') : submit())
  const dismiss = () => setUi('idle')

  const context = {
    brandKey,
    brand,
    intent,
    theme,
    model,
    setModel,
    date,
    setDate,
    time,
    setTime,
    name,
    setName,
    dial,
    setDial,
    phone,
    setPhone,
    valid,
    submit,
    modelName,
    summaryDate,
    availability,
    loadingAvail,
    availError,
    loadAvailability,
  }

  return (
    <div
      ref={rootRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--af-bg,#F4F3F0)',
        color: 'var(--af-ink,#12100F)',
        fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif',
        transition: 'background 420ms ease, color 420ms ease',
      }}
    >
      <Header brand={brandKey} />
      <main style={{ flex: '1 1 auto' }}>
        <Outlet context={context} />
      </main>
      <Footer />
      <SubmitOverlay
        ui={ui}
        title={overlay.title}
        body={overlay.body}
        whatsappHref={whatsappUrl}
        onRetry={retry}
        retryLabel={ui === 'slot_taken' ? 'Elegir otro horario' : 'Reintentar'}
        onDismiss={dismiss}
      />
    </div>
  )
}

export function useFlow() {
  return useOutletContext()
}

export default function App() {
  return (
    <ConversationProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":brand" element={<Intent />} />
          <Route path=":brand/info" element={<Info />} />
          <Route path=":brand/schedule" element={<Schedule />} />
        </Route>
      </Routes>
    </ConversationProvider>
  )
}
