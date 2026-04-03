import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { SpamGuardService } from '../../services/spam-guard.service';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.scss'],
})
export class ContattiComponent implements OnInit, OnDestroy {
  form: FormGroup;
  invioInCorso  = false;
  bloccatoMsg: string | null = null;
  secondiRimanenti = 0;
  /** Mostra il banner di conferma dopo un invio riuscito */
  inviatoConSuccesso = false;

  private sub!: Subscription;
  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  servizi = [
    'Biologo Nutrizionista',
    'Cardiologo',
    'Chirurgo Estetico',
    'Chirurgo Vascolare',
    'Dermatologo',
    'Diabetologo',
    'Ecografista',
    'Endocrinologo',
    'Gastroenterologo',
    'Ginecologo',
    'Logopedista',
    'Neurologo',
    'Neurochirurgo',
    'Oculista',
    'Ortopedico',
    'Osteopata',
    'Pneumologo',
    'Podologo',
    'Psicologo',
    'Urologo',
    'Altro',
  ];

  info = [
    { icon: 'location_on', label: 'Indirizzo',  valore: 'Viale Salvatore Cottoni, 44 – 07037 Sorso (SS)' },
    { icon: 'phone',       label: 'Telefono',   valore: '070 2079940  ·  339 196 9098' },
    { icon: 'email',       label: 'Email',      valore: 'aeffelab22@gmail.com' },
    { icon: 'schedule',    label: 'Orari',      valore: 'Centro 09:00–19:30  ·  Sab/Dom Chiuso' },
  ];

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
    private prenotazioneService: PrenotazioneService,
    private whatsappService: WhatsappService,
    private spamGuard: SpamGuardService,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      nome:      ['', [Validators.required, Validators.minLength(2)]],
      cognome:   ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      telefono:  ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,}$/)]],
      servizio:  ['', Validators.required],
      messaggio: [''],
    });
  }

  ngOnInit(): void {
    this.sub = this.prenotazioneService.specialistaSelezionato$.subscribe(nome => {
      if (nome) {
        this.form.patchValue({ servizio: nome });
        this.prenotazioneService.reset();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.clearCountdown();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // ── Spam guard ──────────────────────────────────────────────
    const guard = this.spamGuard.puoInviare(this.form.value);
    if (!guard.ok) {
      this.bloccatoMsg = guard.messaggio ?? 'Richiesta bloccata.';
      if (guard.secondiRimanenti) {
        this.avviaCountdown(guard.secondiRimanenti);
      }
      return;
    }
    // ────────────────────────────────────────────────────────────

    this.invioInCorso = true;
    this.bloccatoMsg  = null;
    this.clearCountdown();

    try {
      await this.emailService.inviaPrenotazione(this.form.value);
      // Registra l'invio riuscito
      this.spamGuard.registraInvio(this.form.value);
      this.whatsappService.inviaNotifica(this.form.value);
      this.inviatoConSuccesso = true;
      this.form.reset();
    } catch {
      this.snackBar.open('❌ Errore nell\'invio. Riprova o chiamaci.', 'Chiudi', {
        duration: 8000, panelClass: ['snack-error']
      });
    } finally {
      this.invioInCorso = false;
    }
  }

  getError(field: string): string {
    const ctrl = this.form.get(field);
    if (!ctrl?.touched || !ctrl.errors) return '';
    if (ctrl.errors['required'])  return 'Campo obbligatorio';
    if (ctrl.errors['email'])     return 'Email non valida';
    if (ctrl.errors['minlength']) return 'Valore troppo corto';
    if (ctrl.errors['pattern'])   return 'Formato non valido';
    return '';
  }

  // ── Countdown helpers ──────────────────────────────────────────
  private avviaCountdown(secondi: number): void {
    this.secondiRimanenti = secondi;
    this.clearCountdown();
    this.countdownInterval = setInterval(() => {
      this.secondiRimanenti--;
      if (this.secondiRimanenti <= 0) {
        this.clearCountdown();
        this.bloccatoMsg = null;
      } else {
        // Aggiorna il messaggio con il tempo rimanente
        const m = Math.floor(this.secondiRimanenti / 60);
        const s = this.secondiRimanenti % 60;
        const label = m > 0 ? `${m}m ${s}s` : `${s}s`;
        this.bloccatoMsg = `Hai appena inviato una richiesta. Puoi inviarne un'altra tra ${label}.`;
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  private clearCountdown(): void {
    if (this.countdownInterval !== null) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }
}
