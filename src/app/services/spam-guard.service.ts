import { Injectable } from '@angular/core';

const COOLDOWN_KEY   = 'aflab_last_submit';
const DUPLICATE_KEY  = 'aflab_last_hash';
const COOLDOWN_MS    = 5 * 60 * 1000;   // 5 minuti tra qualsiasi invio
const DUPLICATE_MS   = 24 * 60 * 60 * 1000; // 24h per stessa richiesta

export interface GuardResult {
  ok: boolean;
  /** Messaggio da mostrare all'utente se ok === false */
  messaggio?: string;
  /** Secondi mancanti al cooldown (se applicabile) */
  secondiRimanenti?: number;
}

@Injectable({ providedIn: 'root' })
export class SpamGuardService {

  /**
   * Verifica se l'utente può inviare il form.
   * Ritorna { ok: true } se può procedere, altrimenti { ok: false, messaggio, secondiRimanenti }.
   */
  puoInviare(formValue: { email: string; servizio: string }): GuardResult {
    const ora = Date.now();

    // 1. Cooldown globale
    const ultimoInvio = Number(localStorage.getItem(COOLDOWN_KEY) ?? '0');
    const trascorso   = ora - ultimoInvio;
    if (ultimoInvio && trascorso < COOLDOWN_MS) {
      const secondiRimanenti = Math.ceil((COOLDOWN_MS - trascorso) / 1000);
      const minuti = Math.floor(secondiRimanenti / 60);
      const secondi = secondiRimanenti % 60;
      const label = minuti > 0
        ? `${minuti}m ${secondi}s`
        : `${secondi}s`;
      return {
        ok: false,
        messaggio: `Hai appena inviato una richiesta. Puoi inviarne un'altra tra ${label}.`,
        secondiRimanenti,
      };
    }

    // 2. Duplicate detection (stessa email + stesso servizio nelle ultime 24h)
    const hash    = this.hash(formValue.email.toLowerCase() + '|' + formValue.servizio);
    const stored  = localStorage.getItem(DUPLICATE_KEY);
    if (stored) {
      try {
        const { h, t } = JSON.parse(stored) as { h: string; t: number };
        if (h === hash && (ora - t) < DUPLICATE_MS) {
          return {
            ok: false,
            messaggio: `Hai già inviato una richiesta per "${formValue.servizio}" con questa email nelle ultime 24 ore. Ti contatteremo presto!`,
          };
        }
      } catch { /* ignore */ }
    }

    return { ok: true };
  }

  /**
   * Registra un invio riuscito — chiamare DOPO il successo di EmailJS.
   */
  registraInvio(formValue: { email: string; servizio: string }): void {
    const ora  = Date.now();
    const hash = this.hash(formValue.email.toLowerCase() + '|' + formValue.servizio);
    localStorage.setItem(COOLDOWN_KEY,  String(ora));
    localStorage.setItem(DUPLICATE_KEY, JSON.stringify({ h: hash, t: ora }));
  }

  /**
   * Semplice hash djb2 — non crittografico, solo per confronto.
   */
  private hash(s: string): string {
    let h = 5381;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) + h) ^ s.charCodeAt(i);
    }
    return (h >>> 0).toString(36);
  }
}
