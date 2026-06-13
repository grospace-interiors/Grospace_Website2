declare global {
  interface Window {
    fbq: any
    dataLayer: any[]
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = () => {
  if (window.fbq) window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  // Push to Facebook
  if (window.fbq) window.fbq('track', name, options)
  
  // Push to GTM/GA4 dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: name,
      ...options
    })
  }
}

export const customEvent = (name: string, options = {}) => {
  // Push to Facebook
  if (window.fbq) window.fbq('trackCustom', name, options)
  
  // Push to GTM/GA4 dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: name,
      ...options
    })
  }
}
