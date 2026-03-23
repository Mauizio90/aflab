import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servizio condiviso per aprire uno specialista specifico nella sezione
 * "Visite Specialistiche" da qualsiasi altro componente (es. ServizComponent).
 *
 * Utilizzo:
 *   - Emetti:   this.specialistaViewService.apriSpecialista('Gastroenterologo');
 *   - Ascolta:  this.specialistaViewService.apri$.subscribe(nome => ...)
 */
@Injectable({ providedIn: 'root' })
export class SpecialistaViewService {

  private readonly _apri$ = new BehaviorSubject<string | null>(null);
  readonly apri$ = this._apri$.asObservable();

  apriSpecialista(nome: string): void {
    this._apri$.next(nome);
  }

  reset(): void {
    this._apri$.next(null);
  }
}
