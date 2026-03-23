import { Component, OnInit } from '@angular/core';
import { SheetsService } from '../../services/sheets.service';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  medici: Medico[] = [];
  loading = true;
  error = false;

  constructor(
    private sheetsService: SheetsService,
    private prenotazioneService: PrenotazioneService,
  ) {}

  ngOnInit(): void {
    this.sheetsService.getMedici().subscribe({
      next: (data) => {
        this.medici = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  getInitials(medico: Medico): string {
    return `${medico.nome.charAt(0)}${medico.cognome.charAt(0)}`.toUpperCase();
  }

  contattaMedico(specializzazione: string): void {
    this.prenotazioneService.selezionaSpecialista(specializzazione);
    setTimeout(() => {
      const el = document.getElementById('prenota-form') ?? document.getElementById('contatti');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}
