import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { PrenotazioneService } from '../../services/prenotazione.service';

@Component({
  selector: 'app-contatti',
  templateUrl: './contatti.component.html',
  styleUrls: ['./contatti.component.scss'],
})
export class ContattiComponent implements OnInit, OnDestroy {
  form: FormGroup;
  invioInCorso = false;
  private sub!: Subscription;

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
    { icon: 'location_on', label: 'Indirizzo',  valore: 'Via [da inserire], [Città]' },
    { icon: 'phone',       label: 'Telefono',   valore: '000.000.0000' },
    { icon: 'email',       label: 'Email',      valore: 'info@aflab.it' },
    { icon: 'schedule',    label: 'Orari',      valore: 'Lun–Ven: 09:00–19:00' },
  ];

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
    private prenotazioneService: PrenotazioneService,
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
    // Pre-seleziona lo specialista se arriva dalla sezione Visite Specialistiche
    this.sub = this.prenotazioneService.specialistaSelezionato$.subscribe(nome => {
      if (nome) {
        this.form.patchValue({ servizio: nome });
        this.prenotazioneService.reset();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.invioInCorso = true;
    try {
      await this.emailService.inviaPrenotazione(this.form.value);
      this.snackBar.open('✅ Richiesta inviata! Ti contatteremo presto.', 'Chiudi', {
        duration: 6000, panelClass: ['snack-success']
      });
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
}
