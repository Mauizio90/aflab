import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _privacy  = new BehaviorSubject<boolean>(false);
  private _cookie   = new BehaviorSubject<boolean>(false);

  privacy$  = this._privacy.asObservable();
  cookie$   = this._cookie.asObservable();

  openPrivacy()  { this._privacy.next(true);  document.body.style.overflow = 'hidden'; }
  openCookie()   { this._cookie.next(true);   document.body.style.overflow = 'hidden'; }
  closePrivacy() { this._privacy.next(false); document.body.style.overflow = ''; }
  closeCookie()  { this._cookie.next(false);  document.body.style.overflow = ''; }
}
