declare global {
  interface Window {
    fbq: any
    dataLayer: any[]
  }
}

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

export const pageview = () => {
  if (window.fbq) window.fbq('track', 'PageView')
  
  if (window.dataLayer) {
    const path = window.location.pathname
    
    // Map paths to friendly names
    let customName = 'page_view'
    if (path === '/') customName = 'HomeView'
    else if (path.includes('/lp/landing-page')) customName = 'LandingPageView'
    else if (path.includes('/packages')) customName = 'PackagesView'
    else if (path.includes('/projects')) customName = 'ProjectsView'
    else if (path.includes('/pc')) customName = 'CalculatorView'
    else if (path.includes('/about')) customName = 'AboutView'
    else if (path.includes('/services')) customName = 'ServicesView'
    else {
      // For any other page, use the path as the name (e.g., /contact -> ContactView)
      const cleanName = path.split('/').filter(Boolean).pop() || 'page'
      customName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1) + 'View'
    }

    window.dataLayer.push({
      event: customName,
      page_path: path,
      page_title: document.title
    })
  }
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
