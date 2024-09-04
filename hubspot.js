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
    const autocapture = url.searchParams.get('autocapture');
    const sampleRate = url.searchParams.get('sampleRate');

    if (apiKey) {
      console.log("Fetching and executing Amplitude script synchronously");
  
      // Use XMLHttpRequest to fetch the script synchronously
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `https://cdn.amplitude.com/script/${apiKey}.js`, false); // false makes it synchronous
      xhr.send(null);
  
      if (xhr.status === 200) {
        // Synchronously evaluate the script
        eval(xhr.responseText);
        console.log("Unified script loaded synchronously");
  
        var hubspotutk = getCookie("hubspotutk");
        console.log("hubspotutk: ", hubspotutk);
        if (hubspotutk) {
          const identifyEvent = new amplitude.Identify();
          identifyEvent.set("hubspotutk", hubspotutk);
          amplitude.identify(identifyEvent);
        }
      } else {
        console.error("Failed to load the Amplitude script");
      }
  
      console.log("Unified script fetched and executed synchronously");
    }
  }
  
  console.log("HubSpot script loaded");
  