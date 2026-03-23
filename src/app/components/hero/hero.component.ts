import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  form: FormGroup;
  invioInCorso = false;
  inviato = false;

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
  ) {
    this.form = this.fb.group({
      nomeCognome: ['', [Validators.required, Validators.minLength(3)]],
      telefono:    ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-()]{7,}$/)]],
      email:       ['', [Validators.required, Validators.email]],
      visita:      [''],
      informazioni: [''],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.invioInCorso = true;
    try {
      await this.emailService.inviaPrenotazione({
        nome: this.form.value.nomeCognome,
        cognome: '',
        email: this.form.value.email,
        telefono: this.form.value.telefono,
        servizio: this.form.value.visita,
        messaggio: this.form.value.informazioni,
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
}
