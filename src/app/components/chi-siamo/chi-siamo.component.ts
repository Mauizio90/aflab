import { Component } from '@angular/core';

@Component({
  selector: 'app-chi-siamo',
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.scss'],
})
export class ChiSiamoComponent {
  valori = [
    {
      icon: 'favorite',
      titolo: 'Affidabilità',
      testo: 'Ogni paziente è unico. Il nostro impegno nasce dalla passione per la professione e dal rispetto per chi ci chiede aiuto.',
    },
    {
      icon: 'bolt',
      titolo: 'Rapidità',
      testo: 'Nessuna lunga attesa: organizziamo il servizio per garantire tempi rapidi e una risposta concreta alle tue esigenze.',
    },
    {
      icon: 'hub',
      titolo: 'Approccio integrato',
      testo: 'La sinergia tra i nostri specialisti ci permette di costruire un percorso terapeutico completo e personalizzato.',
    },
    {
      icon: 'verified',
      titolo: 'Qualità',
      testo: 'Tecnologie avanzate, professionisti selezionati e protocolli rigorosi per garantire cure di eccellenza.',
    },
  ];
}
