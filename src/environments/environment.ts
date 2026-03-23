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
  googleSheetsCsvUrl: 'https://docs.google.com/spreadsheets/d/1cFmEdvOpui6WauxULNLei4lX77IhRoWh/gviz/tq?tqx=out:csv&sheet=Medici',

  // URL CSV del foglio "Specialisti" (Visite Specialistiche)
  googleSheetsSpecialistiUrl: 'https://docs.google.com/spreadsheets/d/1cFmEdvOpui6WauxULNLei4lX77IhRoWh/gviz/tq?tqx=out:csv&sheet=Specialisti',

  // ── EmailJS ────────────────────────────────────────────────────
  // Registrati su https://www.emailjs.com (piano Free: 200 email/mese)
  // Dashboard → Email Services → Add New Service (copia Service ID)
  // Dashboard → Email Templates → Create Template (copia Template ID)
  // Dashboard → Account → Public Key (copia Public Key)
  emailjs: {
    serviceId:  'service_mbdin8j',
    templateId: 'template_39v10a6',
    publicKey:  'ctEey7TyrNy4Yq2B9',
  }
};
