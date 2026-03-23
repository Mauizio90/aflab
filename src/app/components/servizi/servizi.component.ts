import { Component } from '@angular/core';

export interface Servizio {
  titolo: string;
  colore: string;
  foto: string;
  grande?: boolean;
}

@Component({
  selector: 'app-servizi',
  templateUrl: './servizi.component.html',
  styleUrls: ['./servizi.component.scss'],
})
export class ServiziComponent {
  serviziPrimari: Servizio[] = [
    {
      titolo: 'Ortopedia e Fisiatria',
      colore: 'var(--clr-srv-1)',
      foto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
      grande: true,
    },
    {
      titolo: 'Diagnostica per Immagini',
      colore: 'var(--clr-srv-2)',
      foto: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80',
      grande: true,
    },
    {
      titolo: 'Osteopatia e Riabilitazione',
      colore: 'var(--clr-srv-3)',
      foto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
      grande: true,
    },
  ];

  serviziSecondari: Servizio[] = [
    {
      titolo: 'Area Medica Specialistica',
      colore: 'var(--clr-srv-4)',
      foto: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&q=80',
    },
    {
      titolo: 'Cardiologia e Neurologia',
      colore: 'var(--clr-srv-5)',
      foto: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80',
    },
    {
      titolo: 'Psicologia e Logopedia',
      colore: 'var(--clr-srv-6)',
      foto: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80',
    },
    {
      titolo: 'Nutrizione e Diabetologia',
      colore: 'var(--clr-srv-7)',
      foto: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80',
    },
    {
      titolo: 'Chirurgia Estetica e Dermatologia',
      colore: 'var(--clr-srv-8)',
      foto: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80',
    },
    {
      titolo: 'Ginecologia e Urologia',
      colore: 'var(--clr-srv-9)',
      foto: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80',
    },
  ];

  scrollTo(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
  }
}
