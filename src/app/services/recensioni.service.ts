import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Recensione {
  nome: string;
  iniziale: string;
  stelle: number;
  testo: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Recensioni reali raccolte da Google Maps (AF lab – Sorso SS)
// Usate come fallback se l'API non è disponibile o il credito è esaurito
// ─────────────────────────────────────────────────────────────────────────────
const RECENSIONI_STATICHE: Recensione[] = [
  {
    nome: 'Federica Mura',
    iniziale: 'F',
    stelle: 5,
    testo: 'Esperienza super positiva. La Dott.ssa Elisa Sanna è stata simpaticissima, mi ha fatto sentire da subito a mio agio ed è stata molto delicata, scrupolosa e chiara nelle spiegazioni. Tornerò sicuramente!'
  },
  {
    nome: 'Andrea Ena',
    iniziale: 'A',
    stelle: 5,
    testo: 'Assolutamente una struttura da raccomandare, gestita in maniera davvero professionale. Son stato assistito dal dottor Canu che oltre ad essere un grandissimo professionista ha un approccio umano ormai raro da trovare in un medico. Un\'eccellenza!'
  },
  {
    nome: 'Francesca Marrone',
    iniziale: 'F',
    stelle: 5,
    testo: 'Ho prenotato una visita in questo laboratorio sotto consiglio di alcuni amici e l\'esperienza è stata più alta delle mie aspettative. Personale competente, gentile e simpatico. Posso ritenermi più che soddisfatta. Assolutamente consigliato.'
  },
  {
    nome: 'Gianluigi Posadinu',
    iniziale: 'G',
    stelle: 5,
    testo: 'Ho prenotato un ecografia. Appuntamento ricevuto in tempi brevissimi. Personale gentilissimo e cordiale al telefono e dottori super competenti. STRACONSIGLIATO'
  },
  {
    nome: 'Alessio Tivoli',
    iniziale: 'A',
    stelle: 5,
    testo: 'Qualità e cortesia a disposizione del cliente. Mi sono recato al centro per una visita specialistica e sono stato accolto da Federico, il segretario, con cordialità e gentilezza. Ambiente pulito. Tornerò sicuramente!!!'
  },
  {
    nome: 'alemogna',
    iniziale: 'A',
    stelle: 5,
    testo: 'Ottimo centro. Cordiale la segreteria. Specialisti di primo livello. Bellissima realtà.'
  },
  {
    nome: 'Andrea Piras',
    iniziale: 'A',
    stelle: 5,
    testo: 'Al centro AF lab ho trovato cortesia, puntualità e professionalità.'
  },
  {
    nome: 'Martino Oggiano',
    iniziale: 'M',
    stelle: 5,
    testo: 'Studio professionale e personale gentilissimo'
  },
];

@Injectable({ providedIn: 'root' })
export class RecensioniService {

  constructor(private http: HttpClient) {}

  getRecensioni(): Observable<Recensione[]> {
    const { apiKey, placeId } = environment.googleMaps;

    if (!apiKey) {
      console.warn('[Recensioni] ⚠️ Nessuna API key → STATICHE');
      return of(RECENSIONI_STATICHE);
    }

    console.log('[Recensioni] 🔑 Chiamo Google Places API...');

    // Places API (New) – chiamata HTTP REST, niente SDK
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const headers = new HttpHeaders({
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'reviews',
    });

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        const reviews: any[] = res.reviews ?? [];
        const recensioni: Recensione[] = reviews
          .filter((r: any) => r.text?.text?.trim() && (r.rating ?? 0) >= 4)
          .map((r: any) => ({
            nome:     r.authorAttribution?.displayName ?? 'Paziente',
            iniziale: (r.authorAttribution?.displayName ?? 'P')[0].toUpperCase(),
            stelle:   r.rating ?? 5,
            testo:    r.text.text.trim(),
          }));
        if (recensioni.length) {
          console.log('[Recensioni] ✅ GOOGLE API – ' + recensioni.length + ' recensioni caricate');
        } else {
          console.warn('[Recensioni] ⚠️ API ok ma vuota → STATICHE');
        }
        // Se l'API non restituisce recensioni → usa statiche
        return recensioni.length ? recensioni : RECENSIONI_STATICHE;
      }),
      // Credito esaurito, quota superata, billing non attivo → usa statiche
      catchError((err) => {
        console.error('[Recensioni] ❌ Errore API:', err.status, err.message, '→ STATICHE');
        return of(RECENSIONI_STATICHE);
      })
    );
  }
}
