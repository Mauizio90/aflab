// ┌─────────────────────────────────────────────────────────────────┐
// │  CONFIGURAZIONE – leggere il README.md prima di modificare      │
// └─────────────────────────────────────────────────────────────────┘
export const environment = {
  production: false,

  // ── Google Sheets ──────────────────────────────────────────────
  // 1. Apri il tuo foglio Google Sheets con i medici
  // 2. File → Condividi → Pubblica sul Web → seleziona "Valore separato da virgole (.csv)"
  // 3. Copia il link generato e incollalo qui sotto
  // URL CSV del foglio "Medici" (Team)
  googleSheetsCsvUrl: 'https://docs.google.com/spreadsheets/d/1IREZyRoCAn0-A-Hh01DtDKXL9xG7UjlU/gviz/tq?tqx=out:csv&sheet=Medici',

  // URL CSV del foglio "Specialisti" (Visite Specialistiche)
  googleSheetsSpecialistiUrl: 'https://docs.google.com/spreadsheets/d/1IREZyRoCAn0-A-Hh01DtDKXL9xG7UjlU/gviz/tq?tqx=out:csv&sheet=Specialisti',

  // ── Google Maps / Places API ───────────────────────────────────
  // Per attivare le recensioni dinamiche da Google Maps:
  // 1. Vai su https://console.cloud.google.com
  // 2. Crea un progetto → Abilita "Places API" e "Maps JavaScript API"
  // 3. API & Services → Credentials → Create API Key → incolla qui sotto
  // 4. Per il placeId: vai su https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
  //    oppure cerca "AF lab Sorso" su Google Maps, l'ID è nel link dopo "place/"
  // NOTA: finché apiKey è '', vengono usate le recensioni statiche di fallback.
  googleMaps: {
    apiKey:  '',                        // ← incolla qui la chiave API quando disponibile
    placeId: 'ChIJa_mZpQtl3BIRqB3fk_BCKiw', // AF lab – Sorso (SS)
  },

  // ── EmailJS ────────────────────────────────────────────────────
  // Registrati su https://www.emailjs.com (piano Free: 200 email/mese)
  // Dashboard → Email Services → Add New Service (copia Service ID)
  // Dashboard → Email Templates → Create Template (copia Template ID)
  // Dashboard → Account → Public Key (copia Public Key)
  emailjs: {
    serviceId:  'service_gbx0pms',
    templateId: 'template_39v10a6',
    publicKey:  'ctEey7TyrNy4Yq2B9',
  }
};
