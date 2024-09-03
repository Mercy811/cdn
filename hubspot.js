function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  const partnerIdEnrichmentPlugin = () => {
    return {
      type: 'enrichment',
      name: 'partner-id-enrichment-plugin',
      execute: async (event) => {
        event.partner_id = 'hubspot';
        return event;
      },
    }
  }
  
  // Get the apiKey from the URL parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const apiKey = urlParams.get('apiKey');
  
  if (apiKey) {
    // Load unified script with the apiKey
    const amplitudeScript = document.createElement('script');
    amplitudeScript.src = `https://cdn.amplitude.com/script/${apiKey}.js`;
    
    // Append the script to the document
    document.head.appendChild(amplitudeScript);
  }
  
  var hubspotutk = getCookie('hubspotutk');
  if (hubspotutk) {
    const identifyEvent = new amplitude.Identify();
    identifyEvent.set('hubspotutk', hubspotutk);
    amplitude.identify(identifyEvent);
  }
  