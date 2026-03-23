import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Medico } from '../models/medico.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SheetsService {

  constructor(private http: HttpClient) {}

  /**
   * Recupera i medici dal foglio Google Sheets pubblicato come CSV.
   *
   * Struttura attesa del foglio (prima riga = intestazioni):
   * | Nome | Cognome | Specializzazione | Descrizione | Foto | Email |
   */
  getMedici(): Observable<Medico[]> {
    const url = environment.googleSheetsCsvUrl;

    // URL non configurato → restituisce dati demo
    if (!url || url.startsWith('INCOLLA')) {
      return of(this.getDemoMedici());
    }

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(csv => this.parseCsv(csv)),
      catchError(err => {
        console.error('Errore nel caricamento dei medici:', err);
        return of(this.getDemoMedici());
      })
    );
  }

  // ─── CSV Parser ───────────────────────────────────────────────
  private parseCsv(csv: string): Medico[] {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return [];

    // salta la riga di intestazione (indice 0)
    return lines.slice(1)
      .map(line => this.parseLine(line))
      .filter(m => m.nome || m.cognome); // salta righe vuote
  }

  private parseLine(line: string): Medico {
    const cols = this.splitCsvLine(line);
    return {
      nome:             this.clean(cols[0]),
      cognome:          this.clean(cols[1]),
      specializzazione: this.clean(cols[2]),
      descrizione:      this.clean(cols[3]),
      foto:             this.clean(cols[4]),
      email:            this.clean(cols[5]),
    };
  }

  /** Gestisce virgole dentro campi tra virgolette */
  private splitCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += ch;
      }
    }
    result.push(current);
    return result;
  }

  private clean(val: string | undefined): string {
    return (val ?? '').trim().replace(/^"|"$/g, '');
  }

  // ─── Dati demo (usati se il foglio non è ancora configurato) ──
  private getDemoMedici(): Medico[] {
    return [
      {
        nome: 'Marco', cognome: 'Bianchi',
        specializzazione: 'Fisioterapista',
        descrizione: 'Specialista in fisioterapia muscolo-scheletrica con oltre 15 anni di esperienza.',
        foto: 'https://ui-avatars.com/api/?name=Marco+Bianchi&background=00695c&color=fff&size=200',
      },
      {
        nome: 'Sara', cognome: 'Conti',
        specializzazione: 'Osteopata',
        descrizione: 'Esperta in osteopatia strutturale e cranio-sacrale per adulti e bambini.',
        foto: 'https://ui-avatars.com/api/?name=Sara+Conti&background=00695c&color=fff&size=200',
      },
      {
        nome: 'Luca', cognome: 'Nettuno',
        specializzazione: 'Nutrizionista',
        descrizione: 'Dietologo e nutrizionista con approccio personalizzato e basato sulle evidenze.',
        foto: 'https://ui-avatars.com/api/?name=Luca+Nettuno&background=00695c&color=fff&size=200',
      },
      {
        nome: 'Anna', cognome: 'Fois',
        specializzazione: 'Psicologa',
        descrizione: 'Psicologa e psicoterapeuta cognitivo-comportamentale, adulti e adolescenti.',
        foto: 'https://ui-avatars.com/api/?name=Anna+Fois&background=00695c&color=fff&size=200',
      },
      {
        nome: 'Giorgio', cognome: 'Manno',
        specializzazione: 'Cardiologo',
        descrizione: 'Specialista in cardiologia clinica ed ecocardiografia.',
        foto: 'https://ui-avatars.com/api/?name=Giorgio+Manno&background=00695c&color=fff&size=200',
      },
      {
        nome: 'Elena', cognome: 'Sanna',
        specializzazione: 'Medicina Estetica',
        descrizione: 'Medico estetico con specializzazione in trattamenti non invasivi e ringiovanimento cutaneo.',
        foto: 'https://ui-avatars.com/api/?name=Elena+Sanna&background=00695c&color=fff&size=200',
      },
    ];
  }
}
