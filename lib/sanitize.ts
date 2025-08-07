/**
 * Sanitization utilities for preventing XSS attacks
 */

// HTML entities that need to be escaped
const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

/**
 * Escape HTML special characters to prevent XSS
 */
export function escapeHtml(text: string | null | undefined): string {
  if (!text) return ''
  
  return String(text).replace(/[&<>"'`=\/]/g, (char) => {
    return htmlEntities[char] || char
  })
}

/**
 * Sanitize a value for safe display in HTML
 */
export function sanitizeValue(value: any): string {
  if (value === null || value === undefined) {
    return 'N/A'
  }
  
  if (typeof value === 'number') {
    return value.toString()
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  
  // For strings, escape HTML entities
  return escapeHtml(String(value))
}

/**
 * Create safe data object for map popups
 */
export function createSafePopupData(data: Record<string, any>): Record<string, string> {
  const safeData: Record<string, string> = {}
  
  // Sanitize all values
  for (const [key, value] of Object.entries(data)) {
    safeData[key] = sanitizeValue(value)
  }
  
  return safeData
}

/**
 * Format a number safely for display
 */
export function formatNumber(value: number | string | null | undefined, decimals: number = 2): string {
  if (value === null || value === undefined) {
    return 'N/A'
  }
  
  const num = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(num)) {
    return 'N/A'
  }
  
  return num.toFixed(decimals)
}

/**
 * Create a safe popup HTML string for plant data
 */
export function createPlantPopupHTML(plant: any): string {
  const name = sanitizeValue(plant.name || plant.Name)
  const operator = sanitizeValue(plant.operator || plant.Operator)
  const capacity = formatNumber(plant.capacity || plant.Capacity || plant['Total Capacity (MW)'])
  const status = sanitizeValue(plant.status || plant.Status)
  const state = sanitizeValue(plant.state || plant.State)
  const county = sanitizeValue(plant.county || plant.County)
  
  let html = `
    <div style="padding: 8px; max-width: 300px;">
      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${name}</h3>
      <div style="font-size: 14px; line-height: 1.5;">
  `
  
  if (operator) {
    html += `<p style="margin: 4px 0;"><strong>Operator:</strong> ${operator}</p>`
  }
  
  if (capacity !== 'N/A') {
    html += `<p style="margin: 4px 0;"><strong>Capacity:</strong> ${capacity} MW</p>`
  }
  
  if (status) {
    html += `<p style="margin: 4px 0;"><strong>Status:</strong> ${status}</p>`
  }
  
  if (state || county) {
    html += `<p style="margin: 4px 0;"><strong>Location:</strong> ${county ? county + ', ' : ''}${state}</p>`
  }
  
  // Add additional fields if they exist
  if (plant.plantType || plant['Plant Type']) {
    const plantType = sanitizeValue(plant.plantType || plant['Plant Type'])
    html += `<p style="margin: 4px 0;"><strong>Type:</strong> ${plantType}</p>`
  }
  
  if (plant.fuelType || plant['Fuel Type']) {
    const fuelType = sanitizeValue(plant.fuelType || plant['Fuel Type'])
    html += `<p style="margin: 4px 0;"><strong>Fuel:</strong> ${fuelType}</p>`
  }
  
  html += `
      </div>
    </div>
  `
  
  return html
}

/**
 * Sanitize URL to prevent javascript: and data: protocols
 */
export function sanitizeUrl(url: string | null | undefined): string {
  if (!url) return '#'
  
  const sanitized = String(url).trim()
  
  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:']
  const lowerUrl = sanitized.toLowerCase()
  
  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '#'
    }
  }
  
  // Ensure it starts with http://, https://, or is a relative path
  if (!sanitized.startsWith('http://') && 
      !sanitized.startsWith('https://') && 
      !sanitized.startsWith('/') && 
      !sanitized.startsWith('#')) {
    return '#'
  }
  
  return sanitized
}

/**
 * Strip all HTML tags from a string
 */
export function stripHtml(html: string): string {
  if (!html) return ''
  
  // Remove script and style elements completely
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  
  // Remove all HTML tags
  text = text.replace(/<[^>]+>/g, '')
  
  // Decode HTML entities
  const textArea = document.createElement('textarea')
  textArea.innerHTML = text
  text = textArea.value
  
  return text.trim()
}