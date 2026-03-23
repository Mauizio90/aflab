import { Component } from '@angular/core';

@Component({
  selector: 'app-come-funziona',
  templateUrl: './come-funziona.component.html',
  styleUrls: ['./come-funziona.component.scss'],
})
export class ComeFunzionaComponent {
  passi = [
    {
      numero: '01',
      icon: 'search',
      titolo: 'Scegli la visita',
      desc: 'Sfoglia i nostri specialisti e individua la visita di cui hai bisogno. Offriamo oltre 20 specializzazioni mediche.',
    },
    {
      numero: '02',
      icon: 'phone_in_talk',
      titolo: 'Prenota in pochi minuti',
      desc: 'Compila il form online, chiamaci o scrivici su WhatsApp. Ti ricontattiamo entro 24 ore per confermare l\'appuntamento.',
    },
    {
      numero: '03',
      icon: 'local_hospital',
      titolo: 'Vieni in studio',
      desc: 'Siamo in Viale S. Cottoni 44 a Sorso. Troverai un ambiente moderno, personale accogliente e tempi brevi.',
    },
  ];

  scrollTo(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
