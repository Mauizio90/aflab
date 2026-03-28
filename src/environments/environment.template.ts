// ┌─────────────────────────────────────────────────────────────────┐
// │  TEMPLATE – copia in environment.ts e inserisci i valori reali  │
// │  NON committare i file environment.ts / environment.prod.ts     │
// └─────────────────────────────────────────────────────────────────┘
export const environment = {
  production: false,

  googleSheetsCsvUrl: 'https://docs.google.com/spreadsheets/d/ID_FOGLIO/gviz/tq?tqx=out:csv&sheet=Medici',
  googleSheetsSpecialistiUrl: 'https://docs.google.com/spreadsheets/d/ID_FOGLIO/gviz/tq?tqx=out:csv&sheet=Specialisti',

  googleMaps: {
    apiKey:  '',   // ← inserisci la tua Google Maps API key
    placeId: '',   // ← inserisci il Place ID della struttura
  },

  emailjs: {
    serviceId:  '',  // ← EmailJS service ID
    templateId: '',  // ← EmailJS template ID
    publicKey:  '',  // ← EmailJS public key
  },

  callmebot: {
    phone:  '',  // ← numero WhatsApp senza + (es. 393391969098)
    apiKey: '',  // ← CallMeBot API key
  },
};
