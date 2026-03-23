# Centro MeC – Sito Web Angular

Sito web del Centro Medico Polispecialistico MeC di Alghero.

---

## 🚀 Avvio rapido

```bash
npm install
npm start
```
Apri il browser su **http://localhost:4200**

---

## 📋 Configurazione iniziale (obbligatoria)

Prima di usare il sito in produzione devi configurare due servizi gratuiti:
**Google Sheets** (gestione medici) e **EmailJS** (invio email prenotazioni).

---

## 👩‍⚕️ 1. Gestione medici con Google Sheets

Il cliente può aggiungere, rimuovere e modificare i medici direttamente da un foglio Google,
senza toccare il codice.

### Passo 1 – Crea il foglio

1. Vai su [Google Sheets](https://sheets.google.com) e crea un nuovo foglio
2. Nella **prima riga** inserisci esattamente queste intestazioni (rispetta maiuscole):

| Nome | Cognome | Specializzazione | Descrizione | Foto | Email |
|------|---------|-----------------|-------------|------|-------|
| Marco | Bianchi | Fisioterapista | Specialista in... | https://... | marco@email.it |
| Sara | Conti | Osteopata | Esperta in... | https://... | |

> **Nota sulla colonna Foto:** inserisci un URL pubblico dell'immagine.
> Se non hai la foto, lascia il campo vuoto: il sito mostrerà le iniziali automaticamente.
> Per usare Google Drive: carica la foto → tasto destro → "Ottieni link" → imposta su "Chiunque con il link" → copia il link diretto (formato: `https://drive.google.com/uc?id=XXX`).

### Passo 2 – Pubblica il foglio come CSV

1. Nel foglio vai su **File → Condividi → Pubblica sul Web**
2. Nella prima tendina seleziona il foglio (es. "Foglio1")
3. Nella seconda tendina seleziona **"Valori separati da virgola (.csv)"**
4. Clicca **Pubblica** e conferma
5. **Copia il link** che appare (simile a: `https://docs.google.com/spreadsheets/d/XXX/pub?gid=0&single=true&output=csv`)

### Passo 3 – Incolla l'URL nel progetto

Apri il file `src/environments/environment.ts` e sostituisci:
```ts
googleSheetsCsvUrl: 'INCOLLA_QUI_IL_TUO_URL_CSV_DI_GOOGLE_SHEETS',
```
con il link copiato. Fai lo stesso in `src/environments/environment.prod.ts`.

### ✅ Come aggiorna il cliente

Il cliente apre il foglio Google e modifica le righe normalmente (aggiunge, rimuove, modifica).
Le modifiche saranno visibili sul sito entro pochi minuti, senza bisogno di rebuild.

---

## 📧 2. Invio email prenotazioni con EmailJS

Le prenotazioni inviate dal form arrivano via email alla casella del cliente.

### Passo 1 – Crea account EmailJS

1. Registrati su [https://www.emailjs.com](https://www.emailjs.com) (piano Free: **200 email/mese**)
2. Accedi alla dashboard

### Passo 2 – Collega un servizio email

1. Vai su **Email Services → Add New Service**
2. Scegli il provider (es. Gmail, Outlook, o SMTP custom)
3. Segui le istruzioni per autorizzare l'account
4. **Copia il Service ID** (es. `service_abc123`)

### Passo 3 – Crea il template email

1. Vai su **Email Templates → Create New Template**
2. Imposta il template con queste variabili (copia e incolla):

```
Oggetto: Nuova prenotazione da {{nome}} {{cognome}}

Salve,

Nuova richiesta di prenotazione dal sito Centro MeC:

👤 Paziente: {{nome}} {{cognome}}
📧 Email: {{email}}
📞 Telefono: {{telefono}}
🏥 Servizio: {{servizio}}
💬 Messaggio: {{messaggio}}

---
Centro MeC – Sistema prenotazioni automatico
```

3. In **"To Email"** inserisci l'email del cliente (dove arriveranno le prenotazioni)
4. Salva e **copia il Template ID** (es. `template_xyz789`)

### Passo 4 – Copia la Public Key

1. Vai su **Account → General**
2. Copia la **Public Key** (es. `user_AbCdEfGh`)

### Passo 5 – Incolla le credenziali nel progetto

Apri `src/environments/environment.ts`:

```ts
emailjs: {
  serviceId:  'service_abc123',   // ← il tuo Service ID
  templateId: 'template_xyz789',  // ← il tuo Template ID
  publicKey:  'user_AbCdEfGh',    // ← la tua Public Key
}
```
Fai lo stesso in `src/environments/environment.prod.ts`.

---

## 🏗️ Build per produzione

```bash
npm run build
```
I file pronti per il deploy si trovano in `dist/centro-mec/`.
Carica il contenuto di quella cartella sul tuo hosting (es. Netlify, Vercel, hosting condiviso).

> **Importante:** su hosting condivisi con Apache, aggiungi un file `.htaccess` nella root:
> ```
> RewriteEngine On
> RewriteCond %{REQUEST_FILENAME} !-f
> RewriteCond %{REQUEST_FILENAME} !-d
> RewriteRule ^ index.html [L]
> ```

---

## 📁 Struttura del progetto

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/        # Barra di navigazione (sticky, responsive)
│   │   ├── hero/          # Sezione hero con hero image e stats
│   │   ├── servizi/       # Griglia dei servizi offerti
│   │   ├── chi-siamo/     # Presentazione del centro con valori
│   │   ├── team/          # Schede medici (dati da Google Sheets)
│   │   ├── contatti/      # Form prenotazione (invia via EmailJS) + mappa
│   │   └── footer/        # Footer con info, orari, link
│   ├── models/
│   │   └── medico.model.ts   # Interfaccia TypeScript per i medici
│   ├── services/
│   │   ├── sheets.service.ts # Legge i medici da Google Sheets CSV
│   │   └── email.service.ts  # Invia email tramite EmailJS
│   ├── app.module.ts
│   └── app.component.ts
├── environments/
│   ├── environment.ts         # ← CONFIGURA QUI le credenziali
│   └── environment.prod.ts   # ← CONFIGURA QUI per produzione
└── styles.scss                # Stili globali + tema Material
```

---

## 🎨 Personalizzazione rapida

### Cambiare i colori
Modifica le variabili CSS in `src/styles.scss`:
```scss
:root {
  --clr-primary:      #00695c;  // verde teal principale
  --clr-accent:       #f9a825;  // giallo/ambra accento
  --clr-primary-dark: #004d40;  // verde scuro
}
```

### Cambiare i servizi
Modifica l'array `servizi` in `src/app/components/servizi/servizi.component.ts`

### Cambiare gli orari / indirizzo
Modifica l'array `info` in `src/app/components/contatti/contatti.component.ts`

### Cambiare i valori "Chi Siamo"
Modifica l'array `valori` in `src/app/components/chi-siamo/chi-siamo.component.ts`

---

## 📞 Supporto

Per problemi tecnici, contattare lo sviluppatore.
