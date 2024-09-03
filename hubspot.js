function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const partnerIdEnrichmentPlugin = () => {
  return {
    type: "enrichment",
    name: "partner-id-enrichment-plugin",
    execute: async (event) => {
      event.partner_id = "hubspot";
      return event;
    },
  };
};

console.log("Starting HubSpot script");

const scriptElement = document.querySelector('script[src*="hubspot.js"]');
if (scriptElement) {
    const url = new URL(scriptElement.src);
    const apiKey = url.searchParams.get('apiKey');
    console.log('API Key:', apiKey);
    if (apiKey) {
        // Load unified script with the apiKey
        const amplitudeScript = document.createElement("script");
        amplitudeScript.src = `https://cdn.amplitude.com/script/${apiKey}.js`;
      
        // Append the script to the document
        document.head.appendChild(amplitudeScript);
      }
}

var hubspotutk = getCookie("hubspotutk");
console.log("hubspotutk: ", hubspotutk);
if (hubspotutk) {
  const identifyEvent = new amplitude.Identify();
  identifyEvent.set("hubspotutk", hubspotutk);
  amplitude.identify(identifyEvent);
}

console.log("HubSpot script loaded");
