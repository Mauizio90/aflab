import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  scrolled = false;
  mobileMenuOpen = false;

  navLinks = [
    { label: 'Home',        anchor: 'home'      },
    { label: 'Il Centro',   anchor: 'chi-siamo' },
    { label: 'Servizi',      anchor: 'servizi'     },
    { label: 'Specialisti',  anchor: 'specialisti' },
    { label: 'Team',        anchor: 'team'         },
    { label: 'Recensioni',  anchor: 'recensioni'   },
    { label: 'Contatti',    anchor: 'contatti'     },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 60;
  }

  scrollTo(anchor: string): void {
    this.mobileMenuOpen = false;
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMobile(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
