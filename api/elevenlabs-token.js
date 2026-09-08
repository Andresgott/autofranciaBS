export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0')
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const origin = req.headers.origin
  const host = req.headers.host
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return res.status(403).json({ error: 'forbidden' })
    } catch {
      return res.status(403).json({ error: 'forbidden' })
    }
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  const agentId = process.env.ELEVENLABS_AGENT_ID
  if (!apiKey || !agentId) return res.status(500).json({ error: 'voice_agent_not_configured' })

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${encodeURIComponent(agentId)}`,
      { headers: { 'xi-api-key': apiKey, Accept: 'application/json' } },
    )
    const data = await upstream.json().catch(() => ({}))
    if (!upstream.ok || !data.token) return res.status(502).json({ error: 'token_unavailable' })

    return res.status(200).json({
      token: data.token,
      conversationId: data.conversationId || data.conversation_id || '',
    })
  } catch {
    return res.status(502).json({ error: 'token_unavailable' })
  }
}
