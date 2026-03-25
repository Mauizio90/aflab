import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-bar',
  templateUrl: './trust-bar.component.html',
  styleUrls: ['./trust-bar.component.scss'],
})
export class TrustBarComponent {
  pillole = [
    { icon: 'star',            valore: '5.0',    label: 'su Google Maps'          },
    { icon: 'medical_services',valore: '20+',    label: 'specialisti disponibili' },
    { icon: 'timer',           valore: '24h',    label: 'per fissare un appuntamento' },
    { icon: 'location_on',     valore: 'Sorso',  label: 'Viale Salvatore Cottoni 44 (SS)' },
  ];
}
