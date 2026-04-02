import { Component, OnInit } from '@angular/core';
import { RecensioniService, Recensione } from '../../services/recensioni.service';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.scss'],
})
export class RecensioniComponent implements OnInit {
  recensioni: Recensione[] = [];
  caricamento = true;

  // Colori avatar per iniziali – ciclati
  private readonly colori = [
    '#3a7ca5', '#2e8b6e', '#7b5ea7',
    '#c87a00', '#1a7a9a', '#5a7d6e',
  ];

  constructor(private recensioniService: RecensioniService) {}

  ngOnInit(): void {
    this.recensioniService.getRecensioni().subscribe({
      next: (data) => {
        this.recensioni = data;
        this.caricamento = false;
      },
      error: (err) => {
        console.error('[Recensioni] ❌ Errore:', err);
        this.caricamento = false;
      }
    });
  }

  coloreAvatar(index: number): string {
    return this.colori[index % this.colori.length];
  }

  stelle(n: number): string[] {
    return Array(n).fill('star');
  }
}
