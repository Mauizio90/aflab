import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  anno = new Date().getFullYear();

  links = [
    { label: 'Area Medica Specialistica', anchor: 'servizi'    },
    { label: 'Visite Specialistiche',     anchor: 'servizi'    },
    { label: 'Chi siamo',                 anchor: 'chi-siamo'  },
    { label: 'Il Team',                   anchor: 'team'       },
    { label: 'Recensioni',                anchor: 'recensioni' },
    { label: 'Contatti',                  anchor: 'contatti'   },
  ];

  constructor(private modal: ModalService) {}

  scrollTo(anchor: string): void {
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
  }

  openPrivacy(): void  { this.modal.openPrivacy(); }
  openCookie(): void   { this.modal.openCookie(); }
}
