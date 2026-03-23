import { Component, OnInit } from '@angular/core';
import { SheetsService } from '../../services/sheets.service';
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

  constructor(private sheetsService: SheetsService) {}

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
}
