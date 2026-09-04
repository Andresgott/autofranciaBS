/**
 * AutoFrancia frontend service layer.
 * Single place where the frontend talks to n8n. No business logic here:
 * the backend is authoritative for availability and for lead validation.
 */

const N8N_BASE_URL = import.meta.env.VITE_AF_N8N_BASE_URL || ''

export const config = {
  // In dev, requests go through the Vite proxy (see vite.config.js) so no
  // base URL is needed. In production, VITE_AF_N8N_BASE_URL points at the
  // real n8n host and paths are called directly.
  baseUrl: import.meta.env.DEV ? '' : N8N_BASE_URL,
  availabilityPath: import.meta.env.DEV ? '/api/autofrancia/availability' : '/webhook/autofrancia-availability',
  leadPath: import.meta.env.DEV ? '/api/autofrancia/lead' : '/webhook/autofrancia-lead',
}

/* ---------------------------------- attribution --------------------------- */

const ATTR_KEY = 'af_attribution'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid']

export function captureAttribution() {
  let stored = {}
  try {
    stored = JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}')
  } catch (e) {
    stored = {}
  }
  const params = new URLSearchParams(location.search)
  const fresh = {}
  UTM_KEYS.forEach((k) => {
    const v = params.get(k)
    if (v) fresh[k] = v
  })
  const data = {
    ...stored,
    ...fresh,
    referrer: stored.referrer || document.referrer || '',
    landing_url: stored.landing_url || location.href,
  }
  try {
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(data))
  } catch (e) {}
  return data
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}')
  } catch (e) {
    return {}
  }
}

/**
 * Maps stored attribution into the `source` shape n8n expects, plus the
 * top-level click-id fields.
 */
function attributionForPayload() {
  const a = getAttribution()
  return {
    source: {
      utmSource: a.utm_source || '',
      utmMedium: a.utm_medium || '',
      utmCampaign: a.utm_campaign || '',
      utmContent: a.utm_content || '',
      utmTerm: a.utm_term || '',
    },
    fbclid: a.fbclid || '',
    gclid: a.gclid || '',
  }
}

/* ---------------------------------- requests ------------------------------ */

function url(path, query) {
  const qs = query ? '?' + new URLSearchParams(query).toString() : ''
  return (config.baseUrl || '') + path + qs
}

/**
 * GET /webhook/autofrancia-availability?brand=PEUGEOT
 * Expected shape: { ok: true, brand, timezone, dates: [{ date, label, weekday, pool, slots: [...] }] }
 * The UI renders only what comes back here.
 */
export async function getAvailability(brand) {
  const res = await fetch(url(config.availabilityPath, { brand }), {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error('availability_failed')
  const data = await res.json()
  if (data && data.ok === false) throw new Error('availability_failed')
  return Array.isArray(data) ? { dates: data } : data
}

/**
 * POST /webhook/autofrancia-lead
 * Resolves with { ok: true, duplicate, leadId, assignedSalesperson, whatsappUrl }
 * or throws an Error whose message the UI maps to a state:
 *   - "slot_taken" -> clear time, refresh availability, ask user to pick again
 *   - anything else -> generic submission error
 */
export async function submitLead(payload) {
  const body = { ...payload, ...attributionForPayload(), pageUrl: location.href }
  const res = await fetch(url(config.leadPath), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (res.status === 422 || data.error === 'INVALID_OR_UNAVAILABLE_APPOINTMENT_SLOT') throw new Error('slot_taken')
  if (!res.ok || data.ok === false) throw new Error(data.error || 'submit_failed')
  return data
}
