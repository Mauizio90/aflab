import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface NotificaPrenotazione {
  nome: string;
  cognome: string;
  telefono: string;
  email: string;
  servizio: string;
  messaggio?: string;
}

@Injectable({ providedIn: 'root' })
export class WhatsappService {

  /**
   * Invia una notifica WhatsApp via CallMeBot al numero configurato.
   * Fire-and-forget: non blocca il form anche se il servizio è irraggiungibile.
   */
  inviaNotifica(dati: NotificaPrenotazione): void {
    const { phone, apiKey } = environment.callmebot;
    if (!phone || !apiKey) return;

    const righe = [
      '📋 Nuova prenotazione Aflab',
      `👤 ${dati.nome} ${dati.cognome}`,
      `📞 ${dati.telefono}`,
      `🏥 ${dati.servizio || 'Non specificato'}`,
      `✉️ ${dati.email}`,
    ];
    if (dati.messaggio?.trim()) {
      righe.push(`💬 ${dati.messaggio.trim()}`);
    }

    const testo = righe.join('\n');
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(testo)}&apikey=${apiKey}`;

    // no-cors: non leggiamo la risposta ma la richiesta parte comunque
    fetch(url, { mode: 'no-cors' }).catch(() => {
      console.warn('WhatsApp notification failed (non-blocking)');
    });
  }
}
