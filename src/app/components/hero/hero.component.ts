import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpamGuardService } from '../../services/spam-guard.service';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnDestroy {
  form: FormGroup;
  invioInCorso = false;
  inviato      = false;
  bloccatoMsg: string | null = null;
  secondiRimanenti = 0;

  private countdownInterval: ReturnType<typeof setInterval> | null = null;

  visitaOptions = [
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

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
    private spamGuard: SpamGuardService,
    private whatsappService: WhatsappService,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      nome:         ['', [Validators.required, Validators.minLength(2)]],
      cognome:      ['', [Validators.required, Validators.minLength(2)]],
      telefono:     ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,}$/)]],
      email:        ['', [Validators.required, Validators.email]],
      visita:       [''],
      informazioni: [''],
    });
  }

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    // ── Spam guard ──────────────────────────────────────────────
    const guard = this.spamGuard.puoInviare({
      email:   this.form.value.email,
      servizio: this.form.value.visita || '',
    });
    if (!guard.ok) {
      this.bloccatoMsg = guard.messaggio ?? 'Richiesta bloccata.';
      if (guard.secondiRimanenti) this.avviaCountdown(guard.secondiRimanenti);
      return;
    }
    // ────────────────────────────────────────────────────────────

    this.invioInCorso = true;
    this.bloccatoMsg  = null;
    this.clearCountdown();

    try {
      await this.emailService.inviaPrenotazione({
        nome:     this.form.value.nome,
        cognome:  this.form.value.cognome,
        email:    this.form.value.email,
        telefono: this.form.value.telefono,
        servizio: this.form.value.visita,
        messaggio: this.form.value.informazioni,
      });
      this.spamGuard.registraInvio({
        email:   this.form.value.email,
        servizio: this.form.value.visita || '',
      });
      this.whatsappService.inviaNotifica({
        nome:     this.form.value.nome,
        cognome:  this.form.value.cognome,
        telefono: this.form.value.telefono,
        email:    this.form.value.email,
        servizio: this.form.value.visita || '',
        messaggio: this.form.value.informazioni || '',
      });
      this.inviato = true;
      this.form.reset();
    } catch {
      this.snackBar.open(
        '❌ Errore nell\'invio. Riprova o chiamaci.',
        'Chiudi',
        { duration: 6000 }
      );
    } finally {
      this.invioInCorso = false;
    }
  }

  scrollTo(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
