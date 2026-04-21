import { Component, OnInit, HostListener } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss'],
})
export class CookiePolicyComponent implements OnInit {
  visible = false;

  constructor(private modal: ModalService) {}

  ngOnInit(): void {
    this.modal.cookie$.subscribe(v => this.visible = v);
  }

  close(): void {
    this.modal.closeCookie();
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { this.close(); }
}
