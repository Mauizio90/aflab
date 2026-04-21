import { Component, OnInit, HostListener } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  visible = false;

  constructor(private modal: ModalService) {}

  ngOnInit(): void {
    this.modal.privacy$.subscribe(v => this.visible = v);
  }

  close(): void {
    this.modal.closePrivacy();
  }

  @HostListener('document:keydown.escape')
  onEsc(): void { this.close(); }
}
