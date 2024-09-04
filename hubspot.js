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

// Add partnerIdEnrichmentPlugin
amplitude.add(partnerIdEnrichmentPlugin());

// Set hubspot cookie as a user property
var hubspotutk = getCookie("hubspotutk");
if (hubspotutk) {
    const identifyEvent = new amplitude.Identify();
    identifyEvent.set("hubspotutk", hubspotutk);
    amplitude.identify(identifyEvent);
}

