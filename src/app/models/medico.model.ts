export interface Medico {
  nome: string;
  cognome: string;
  specializzazione: string;
  descrizione: string;
  foto: string;       // URL immagine (es. link Google Drive o altra CDN)
  email?: string;     // opzionale
}
