import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule }    from '@angular/material/toolbar';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatCardModule }       from '@angular/material/card';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatSelectModule }     from '@angular/material/select';
import { MatSnackBarModule }   from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule }      from '@angular/material/chips';
import { MatDividerModule }    from '@angular/material/divider';
import { MatMenuModule }       from '@angular/material/menu';
import { MatSidenavModule }    from '@angular/material/sidenav';
import { MatListModule }       from '@angular/material/list';

// Components esistenti
import { AppComponent }        from './app.component';
import { NavbarComponent }     from './components/navbar/navbar.component';
import { HeroComponent }       from './components/hero/hero.component';
import { ServiziComponent }    from './components/servizi/servizi.component';
import { ChiSiamoComponent }   from './components/chi-siamo/chi-siamo.component';
import { TeamComponent }       from './components/team/team.component';
import { ContattiComponent }   from './components/contatti/contatti.component';
import { FooterComponent }     from './components/footer/footer.component';

// Nuovi componenti
import { VisiteSpecialisticheComponent } from './components/visite-specialistiche/visite-specialistiche.component';
import { InfoBarComponent }    from './components/info-bar/info-bar.component';
import { CtaFinaleComponent }  from './components/cta-finale/cta-finale.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    ServiziComponent,
    ChiSiamoComponent,
    TeamComponent,
    ContattiComponent,
    FooterComponent,
    VisiteSpecialisticheComponent,
    InfoBarComponent,
    CtaFinaleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
