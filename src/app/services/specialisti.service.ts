import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Specialista } from '../components/visite-specialistiche/visite-specialistiche.component';

@Injectable({ providedIn: 'root' })
export class SpecialistiService {

  constructor(private http: HttpClient) {}

  /**
   * Recupera gli specialisti dal foglio Google Sheets pubblicato come CSV.
   *
   * Struttura attesa (prima riga = intestazioni):
   * | Nome | Icon | Intro | Dettagli (separati da |) | Quando | Servizio |
   *
   * La colonna "Servizio" è opzionale: se compilata, collega lo specialista
   * alla card corrispondente nella sezione Servizi (es. "Nutrizione e Diabetologia").
   * Deve corrispondere esattamente al titolo della card in servizi.component.ts.
   */
  getSpecialisti(): Observable<Specialista[]> {
    const url = environment.googleSheetsSpecialistiUrl;

    if (!url || url.startsWith('INCOLLA')) {
      return of([]);          // fallback → usa dati hardcoded nel componente
    }

    return this.http.get(url, { responseType: 'text' }).pipe(
      map(csv => this.parseCsv(csv)),
      catchError(err => {
        console.error('Errore caricamento specialisti:', err);
        return of([]);
      })
    );
  }

  // ─── CSV Parser ───────────────────────────────────────────────
  private parseCsv(csv: string): Specialista[] {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return [];

    // Trova dinamicamente la riga header (quella che inizia con "Nome")
    // così funziona anche se il foglio ha righe extra prima degli header
    const headerIdx = lines.findIndex(l => {
      const first = this.clean(this.splitCsvLine(l)[0]).toLowerCase();
      return first === 'nome';
    });

    const dataStart = headerIdx !== -1 ? headerIdx + 1 : 1;

    return lines.slice(dataStart)
      .map(line => this.parseLine(line))
      .filter(s => !!s.nome);
  }

  private parseLine(line: string): Specialista {
    const cols = this.splitCsvLine(line);
    const dettagliRaw = this.clean(cols[3]);
    return {
      nome:     this.clean(cols[0]),
      icon:     this.clean(cols[1]) || 'medical_services',
      intro:    this.clean(cols[2]),
      dettagli: dettagliRaw ? dettagliRaw.split('|').map(d => d.trim()).filter(Boolean) : [],
      quando:   this.clean(cols[4]),
      servizio: this.clean(cols[5]) || undefined,   // ← colonna 6: "Servizio"
    };
  }

  private splitCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === ',' && !inQuotes) { result.push(current); current = ''; }
      else { current += ch; }
    }
    result.push(current);
    return result;
  }

  private clean(val: string | undefined): string {
    return (val ?? '').trim().replace(/^"|"$/g, '');
  }
}
