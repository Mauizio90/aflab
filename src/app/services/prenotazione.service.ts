import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrenotazioneService {
  private specialista$ = new BehaviorSubject<string | null>(null);
  specialistaSelezionato$ = this.specialista$.asObservable();

  selezionaSpecialista(nome: string): void {
    this.specialista$.next(nome);
  }

  reset(): void {
    this.specialista$.next(null);
  }
}
