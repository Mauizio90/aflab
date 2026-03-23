import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Recensione {
  nome: string;
  iniziale: string;
  stelle: number;
  testo: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Recensioni reali raccolte da Google Maps (AF lab – Sorso SS)
// Aggiornare quando si ottiene la chiave API Google Places
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

// ─────────────────────────────────────────────────────────────────────────────
// Dichiarazioni globali per il SDK di Maps
// ─────────────────────────────────────────────────────────────────────────────
declare const google: any;

@Injectable({ providedIn: 'root' })
export class RecensioniService {

  getRecensioni(): Observable<Recensione[]> {
    const { apiKey, placeId } = environment.googleMaps;

    // Se non è ancora configurata la chiave API → usa le recensioni statiche
    if (!apiKey || apiKey === '' || placeId.startsWith('ChIJ...') || placeId === '') {
      return of(RECENSIONI_STATICHE);
    }

    return from(this.caricaDaMapsApi(apiKey, placeId));
  }

  // ── Google Places API via Maps JavaScript SDK ─────────────────────────────
  private async caricaDaMapsApi(apiKey: string, placeId: string): Promise<Recensione[]> {
    try {
      await this.caricaScriptMaps(apiKey);

      return new Promise<Recensione[]>((resolve) => {
        const service = new google.maps.places.PlacesService(
          document.createElement('div')
        );

        service.getDetails(
          { placeId, fields: ['reviews'], language: 'it' },
          (place: any, status: string) => {
            if (status === 'OK' && place?.reviews?.length) {
              const recensioni: Recensione[] = place.reviews
                .filter((r: any) => r.text?.trim())
                .map((r: any) => ({
                  nome: r.author_name ?? 'Paziente',
                  iniziale: (r.author_name ?? 'P')[0].toUpperCase(),
                  stelle: r.rating ?? 5,
                  testo: r.text.trim(),
                }));
              resolve(recensioni.length ? recensioni : RECENSIONI_STATICHE);
            } else {
              resolve(RECENSIONI_STATICHE);
            }
          }
        );
      });
    } catch {
      return RECENSIONI_STATICHE;
    }
  }

  // ── Carica dinamicamente il SDK di Maps ──────────────────────────────────
  private caricaScriptMaps(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Già caricato
      if (typeof google !== 'undefined' && google?.maps?.places) {
        resolve();
        return;
      }
      // Script già inserito nel DOM ma non ancora pronto
      const existente = document.getElementById('gmaps-sdk');
      if (existente) {
        existente.addEventListener('load', () => resolve());
        existente.addEventListener('error', reject);
        return;
      }
      // Inserisci il tag <script>
      const script = document.createElement('script');
      script.id   = 'gmaps-sdk';
      script.src  = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=it`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}
