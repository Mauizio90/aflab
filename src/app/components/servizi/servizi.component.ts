import { Component, OnInit } from '@angular/core';
import { SpecialistiService } from '../../services/specialisti.service';
import { SpecialistaViewService } from '../../services/specialista-view.service';

export interface Servizio {
  titolo: string;
  colore: string;
  foto: string;
  grande?: boolean;

  /**
   * Nomi degli specialisti associati a questa card — usati come fallback
   * quando il foglio Google Sheets non ha ancora la colonna "Servizio".
   *
   * ─── Come collegare un nuovo specialista in autonomia ────────────────────
   * 1. Apri il foglio Google Sheets → tab "Specialisti"
   * 2. Aggiungi la colonna "Servizio" (se non c'è ancora)
   * 3. Nella riga dello specialista scrivi esattamente il titolo della card,
   *    ad esempio:  Nutrizione e Diabetologia
   * 4. Salva: il bottone comparirà automaticamente alla prossima visita del sito.
   * ─────────────────────────────────────────────────────────────────────────
   */
  keySpecialisti: string[];
}

@Component({
  selector: 'app-servizi',
  templateUrl: './servizi.component.html',
  styleUrls: ['./servizi.component.scss'],
})
export class ServiziComponent implements OnInit {

  /** Mappa gruppoKey → nomi specialisti risolti (dinamici o fallback hardcoded) */
  specialistiRisolti = new Map<string, string[]>();

  constructor(
    private specialistiService: SpecialistiService,
    private specialistaViewService: SpecialistaViewService,
  ) {}

  ngOnInit(): void {
    this.specialistiService.getSpecialisti().subscribe(tutti => {
      const tutteLeBranche = [...this.serviziPrimari, ...this.serviziSecondari];

      // Se almeno uno specialista ha il campo "servizio" compilato → usa i dati dinamici
      const conServizio = tutti.filter(s => !!s.servizio);

      tutteLeBranche.forEach(srv => {
        if (conServizio.length > 0) {
          const corrispondenti = tutti
            .filter(s => s.servizio === srv.titolo)
            .map(s => s.nome);
          this.specialistiRisolti.set(
            srv.titolo,
            corrispondenti.length > 0 ? corrispondenti : srv.keySpecialisti
          );
        } else {
          // Nessun dato "servizio" nel foglio → usa fallback hardcoded
          this.specialistiRisolti.set(srv.titolo, srv.keySpecialisti);
        }
      });
    });

    // Inizializza con i valori hardcoded in attesa del caricamento del foglio
    [...this.serviziPrimari, ...this.serviziSecondari].forEach(srv => {
      this.specialistiRisolti.set(srv.titolo, srv.keySpecialisti);
    });
  }

  getSpecialisti(srv: Servizio): string[] {
    return this.specialistiRisolti.get(srv.titolo) ?? srv.keySpecialisti;
  }

  // ─── Navigazione: apre la scheda dello specialista nella sezione Visite ───
  apriSpecialista(nome: string): void {
    this.specialistaViewService.apriSpecialista(nome);
    setTimeout(() => {
      const el = document.getElementById('specialisti');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  // ─── Dati delle card ──────────────────────────────────────────────────────

  serviziPrimari: Servizio[] = [
    {
      titolo: 'Ortopedia e Fisiatria',
      colore: 'var(--clr-srv-1)',
      foto: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
      grande: true,
      keySpecialisti: ['Ortopedico'],
    },
    {
      titolo: 'Diagnostica per Immagini',
      colore: 'var(--clr-srv-2)',
      foto: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80',
      grande: true,
      keySpecialisti: ['Ecografista'],
    },
    {
      titolo: 'Osteopatia e Riabilitazione',
      colore: 'var(--clr-srv-3)',
      foto: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80',
      grande: true,
      keySpecialisti: ['Osteopata', 'Podologo'],
    },
  ];

  serviziSecondari: Servizio[] = [
    {
      titolo: 'Area Medica Specialistica',
      colore: 'var(--clr-srv-4)',
      foto: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&q=80',
      keySpecialisti: ['Cardiologo', 'Endocrinologo', 'Gastroenterologo', 'Oculista', 'Pneumologo'],
    },
    {
      titolo: 'Cardiologia e Neurologia',
      colore: 'var(--clr-srv-5)',
      foto: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80',
      keySpecialisti: ['Cardiologo', 'Neurologo', 'Neurochirurgo'],
    },
    {
      titolo: 'Psicologia e Logopedia',
      colore: 'var(--clr-srv-6)',
      foto: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80',
      keySpecialisti: ['Psicologo', 'Logopedista'],
    },
    {
      titolo: 'Nutrizione e Diabetologia',
      colore: 'var(--clr-srv-7)',
      foto: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80',
      keySpecialisti: ['Biologo Nutrizionista', 'Diabetologo'],
    },
    {
      titolo: 'Chirurgia Estetica e Dermatologia',
      colore: 'var(--clr-srv-8)',
      foto: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80',
      keySpecialisti: ['Chirurgo Estetico', 'Dermatologo', 'Chirurgo Vascolare'],
    },
    {
      titolo: 'Ginecologia e Urologia',
      colore: 'var(--clr-srv-9)',
      foto: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80',
      keySpecialisti: ['Ginecologo', 'Urologo'],
    },
  ];
}
