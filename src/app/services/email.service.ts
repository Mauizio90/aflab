import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface PrenotazioneForm {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  servizio: string;
  messaggio: string;
}

@Injectable({ providedIn: 'root' })
export class EmailService {

  constructor() {
    // Inizializza EmailJS con la tua Public Key
    emailjs.init(environment.emailjs.publicKey);
  }

  /**
   * Invia la prenotazione via EmailJS.
   * Assicurati che il tuo template EmailJS contenga le variabili:
   *   {{nome}}, {{cognome}}, {{email}}, {{telefono}}, {{servizio}}, {{messaggio}}
   */
  inviaPrenotazione(form: PrenotazioneForm): Promise<void> {
    const templateParams = {
      nome:      form.nome,
      cognome:   form.cognome,
      email:     form.email,
      telefono:  form.telefono,
      servizio:  form.servizio,
      messaggio: form.messaggio,
    };

    return emailjs
      .send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams
      )
      .then(() => {
        console.log('Email inviata con successo');
      })
      .catch(err => {
        console.error('Errore invio email:', err);
        throw err;
      });
  }
}
