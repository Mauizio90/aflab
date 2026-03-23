import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PrenotazioneService } from '../../services/prenotazione.service';
import { SpecialistiService } from '../../services/specialisti.service';
import { SpecialistaViewService } from '../../services/specialista-view.service';

export interface Specialista {
  nome: string;
  icon: string;
  intro: string;
  dettagli: string[];
  quando: string;
  /** Corrisponde al campo "Servizio" nel foglio Google Sheets Specialisti */
  servizio?: string;
}

@Component({
  selector: 'app-visite-specialistiche',
  templateUrl: './visite-specialistiche.component.html',
  styleUrls: ['./visite-specialistiche.component.scss'],
})
export class VisiteSpecialisticheComponent implements OnInit, OnDestroy {
  specialistaSelezionato: Specialista | null = null;
  loading = true;
  private sub!: Subscription;

  constructor(
    private prenotazioneService: PrenotazioneService,
    private specialistiService: SpecialistiService,
    private specialistaViewService: SpecialistaViewService,
  ) {}

  ngOnInit(): void {
    this.specialistiService.getSpecialisti().subscribe(remoti => {
      if (remoti.length > 0) {
        this.specialisti = remoti;
      }
      this.loading = false;
    });

    // Ascolta le richieste di apertura da altri componenti (es. ServizComponent)
    this.sub = this.specialistaViewService.apri$.subscribe(nome => {
      if (!nome) return;
      const trovato = this.specialisti.find(
        s => s.nome.toLowerCase() === nome.toLowerCase()
      );
      if (trovato) {
        this.specialistaSelezionato = trovato;
      }
      this.specialistaViewService.reset();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  specialisti: Specialista[] = [
    {
      nome: 'Biologo Nutrizionista',
      icon: 'restaurant_menu',
      intro: 'Professionista sanitario che valuta i bisogni energetici e nutritivi, elaborando piani alimentari personalizzati sia per soggetti sani che con patologie diagnosticate.',
      dettagli: [
        'Valutazione Nutrizionale: analizza anamnesi, abitudini alimentari e parametri antropometrici (peso, altezza, circonferenze, bioimpedenziometria).',
        'Piani Alimentari Personalizzati: elabora diete su misura per dimagrimento, aumento di peso, mantenimento, gravidanza, allattamento o specifiche esigenze sportive.',
        'Gestione Nutrizionale in Patologie: collabora col medico curante per gestire diabete, ipertensione, dislipidemie, intolleranze, allergie e disturbi gastrointestinali.',
        'Educazione Alimentare: educa a una corretta alimentazione e a uno stile di vita sano per prevenire malattie metaboliche.',
        'Consulenza Nutrizionale: offre consulenze in studi privati, palestre, mense e aziende alimentari.',
      ],
      quando: 'Rivolgiti al biologo nutrizionista per problemi di peso, gestione di patologie metaboliche, allergie alimentari o per ottimizzare la tua alimentazione quotidiana.',
    },
    {
      nome: 'Cardiologo',
      icon: 'favorite',
      intro: 'Medico specializzato nella diagnosi, prevenzione e trattamento delle malattie del cuore e dei vasi sanguigni, come ipertensione, infarto e aritmie.',
      dettagli: [
        'Diagnosi e Cura: tratta cardiopatia ischemica, insufficienza cardiaca, valvulopatie, ipertensione arteriosa e disturbi del ritmo.',
        'Visita Cardiologica: colloquio (anamnesi), auscultazione del cuore, misurazione della pressione ed ECG.',
        'Esami Diagnostici: ecocardiogramma, prova da sforzo, Holter cardiaco e pressorio.',
        'Procedure Interventistiche: angioplastica coronarica, inserimento di stent, impianto di pacemaker/defibrillatore.',
        'Prevenzione: valuta i fattori di rischio (fumo, diabete, colesterolo, familiarità) per prevenire infarti o ictus.',
      ],
      quando: 'Consulta il cardiologo in caso di dolore al torace, palpitazioni, fiato corto, vertigini, svenimenti o gonfiore alle gambe, o per controlli preventivi dopo i 40 anni.',
    },
    {
      nome: 'Chirurgo Estetico',
      icon: 'face_retouching_natural',
      intro: 'Medico specializzato in chirurgia plastica, ricostruttiva ed estetica che interviene per migliorare l\'aspetto di volto e corpo o correggere inestetismi.',
      dettagli: [
        'Interventi sul Volto: lifting facciale, blefaroplastica (palpebre), rinoplastica (naso), otoplastica, mentoplastica.',
        'Interventi sul Seno: mastoplastica additiva (aumento), riduttiva, mastopessi (sollevamento).',
        'Contorno Corpo: liposuzione, addominoplastica, rimodellamento di braccia e cosce.',
        'Chirurgia Ricostruttiva: ripara danni da traumi, ustioni o asportazioni tumorali.',
        'Opera in anestesia locale, sedazione o anestesia generale a differenza del medico estetico non chirurgico.',
      ],
      quando: 'Rivolgiti al chirurgo estetico per interventi chirurgici di rimodellamento o ricostruzione. Verifica sempre la specializzazione in "Chirurgia Plastica, Ricostruttiva ed Estetica".',
    },
    {
      nome: 'Chirurgo Vascolare',
      icon: 'bloodtype',
      intro: 'Specialista che diagnostica e tratta le malattie dei vasi sanguigni (arterie, vene e vasi linfatici), usando tecniche tradizionali, endovascolari e laser.',
      dettagli: [
        'Diagnosi e Prevenzione: visite specialistiche con eco-color-doppler vascolare per valutare la circolazione.',
        'Trattamento delle Arterie: cura aneurismi, stenosi carotidee e arteriopatia obliterante degli arti inferiori.',
        'Trattamento delle Vene: insufficienza venosa cronica e vene varicose con flebectomia, scleroterapia o laser endovascolare.',
        'Salvataggio dell\'Arto: interviene in caso di ischemia critica per prevenire gangrene e amputazioni.',
      ],
      quando: 'Prenota una visita in caso di dolore alle gambe durante la camminata, pesantezza agli arti, vene sporgenti, ferite che non guariscono o familiarità per aneurismi.',
    },
    {
      nome: 'Dermatologo',
      icon: 'healing',
      intro: 'Medico specializzato nella diagnosi, cura e prevenzione delle malattie di pelle, capelli, unghie e mucose, incluse le infezioni sessualmente trasmissibili.',
      dettagli: [
        'Diagnosi e Cura: esamina lesioni, eruzioni cutanee, pruriti, macchie e infezioni con terapie farmacologiche topiche o sistemiche.',
        'Prevenzione e Screening: mappatura dei nei in epiluminescenza per la prevenzione del melanoma.',
        'Interventi Chirurgici: biopsie cutanee, escissione di cisti o lesioni, crioterapia per verruche.',
        'Dermatologia Estetica e Laser: rimozione macchie, cicatrici, tatuaggi, lesioni vascolari, filler e botox.',
        'Venereologia: diagnosi e cura di infezioni sessualmente trasmissibili (condilomi, herpes).',
      ],
      quando: 'Rivolgiti al dermatologo per nuovi nei che cambiano forma o colore, dermatiti persistenti, acne severa, perdita di capelli o anomalie alle unghie.',
    },
    {
      nome: 'Diabetologo',
      icon: 'monitor_heart',
      intro: 'Medico specializzato nella diagnosi, cura e gestione del diabete mellito (tipo 1, tipo 2, gestazionale) e delle sue complicanze.',
      dettagli: [
        'Diagnosi e Monitoraggio: valuta esami del sangue (glicemia, emoglobina glicata) e parametri metabolici.',
        'Terapia Personalizzata: definisce la terapia farmacologica (ipoglicemizzanti orali o insulina) e istruisce il paziente sull\'autocontrollo glicemico.',
        'Gestione delle Complicanze: screening per prevenire complicanze croniche, incluso il "piede diabetico".',
        'Educazione Terapeutica: consulenza nutrizionale e consigli sullo stile di vita per migliorare il controllo metabolico.',
      ],
      quando: 'Consulta il diabetologo per glicemia costantemente alta, gestione del diabete di qualsiasi tipo, necessità di terapia insulinica o monitoraggio preventivo.',
    },
    {
      nome: 'Ecografista',
      icon: 'display_settings',
      intro: 'Medico specializzato nell\'uso dell\'ecografo per visualizzare in tempo reale organi, tessuti e vasi sanguigni tramite ultrasuoni non invasivi.',
      dettagli: [
        'Ruolo Diagnostico: esegue e interpreta ecografie, ecocolordoppler (flussi sanguigni) e procedure interventistiche come biopsie.',
        'Aree di competenza: addome, tiroide, mammella, muscoli e tendini, vasi sanguigni.',
        'Vantaggi: diagnosi rapide e non dolorose, senza radiazioni, fondamentali per prevenzione e monitoraggio.',
        'Collaborazione: lavora con radiologi, ginecologi, cardiologi e altri specialisti per una diagnosi integrata.',
      ],
      quando: 'L\'ecografia è prescritta dal medico curante o dallo specialista per valutare organi interni, controllare la gravidanza, analizzare i vasi sanguigni o monitorare patologie note.',
    },
    {
      nome: 'Endocrinologo',
      icon: 'science',
      intro: 'Medico specialista che diagnostica e cura le malattie delle ghiandole endocrine (tiroide, ipofisi, surreni) e i disturbi ormonali.',
      dettagli: [
        'Visita Specialistica: analizza sintomi, esamina la storia clinica e valuta le ghiandole tramite palpazione.',
        'Diagnostica: esami del sangue/urine per misurare i livelli ormonali, ecografie, TC e risonanze.',
        'Patologie della Tiroide: ipotiroidismo, ipertiroidismo, tiroiditi, gozzo, noduli.',
        'Metabolismo e Diabete: diabete tipo 1/2, sovrappeso e obesità.',
        'Ormoni e Riproduzione: sindrome dell\'ovaio policistico, menopausa, ipogonadismo, osteoporosi.',
      ],
      quando: 'Rivolgiti all\'endocrinologo per stanchezza estrema, variazioni di peso inspiegabili, alterazioni del ciclo mestruale, disturbi della crescita o sintomi tiroidei.',
    },
    {
      nome: 'Gastroenterologo',
      icon: 'emergency',
      intro: 'Medico specialista che diagnostica e cura le patologie dell\'apparato digerente: esofago, stomaco, intestino, fegato, pancreas e vie biliari.',
      dettagli: [
        'Diagnosi e trattamento: reflusso gastroesofageo, gastrite, ulcera, celiachia, sindrome dell\'intestino irritabile, colite, morbo di Crohn.',
        'Visita Gastroenterologica: anamnesi, visita fisica con palpazione dell\'addome e prescrizione di esami.',
        'Esami Specialistici: gastroscopia, colonscopia, ecografie addominali, analisi del sangue o delle feci.',
        'Prevenzione: guida il paziente verso uno stile di vita corretto con attenzione alla dieta.',
      ],
      quando: 'Consulta il gastroenterologo per bruciore di stomaco, dolore addominale, difficoltà digestive, diarrea o stitichezza cronica, nausea, vomito o sanguinamento rettale.',
    },
    {
      nome: 'Ginecologo',
      icon: 'pregnant_woman',
      intro: 'Medico specializzato nella salute dell\'apparato genitale femminile e riproduttivo in tutte le fasi della vita, dalla pubertà alla menopausa.',
      dettagli: [
        'Prevenzione e Screening: pap test, hpv test per prevenire tumori del collo dell\'utero.',
        'Visita Ginecologica: valutazione di utero, ovaie, tube e vagina, con ecografia pelvica o transvaginale.',
        'Salute Riproduttiva: consulenza su metodi contraccettivi e gestione dell\'infertilità.',
        'Ostetricia: assistenza durante gravidanza, parto e puerperio.',
        'Patologie: infezioni vaginali, irregolarità del ciclo, fibromi, endometriosi, problematiche della menopausa.',
        'Chirurgia: laparoscopia, isterectomia e altri interventi.',
      ],
      quando: 'Effettua una visita ginecologica periodicamente (almeno una volta l\'anno) e in caso di irregolarità del ciclo, dolori pelvici, secrezioni anomale o per pianificazione familiare.',
    },
    {
      nome: 'Logopedista',
      icon: 'record_voice_over',
      intro: 'Professionista sanitario che previene, valuta e tratta i disturbi del linguaggio, della comunicazione, della voce e della deglutizione.',
      dettagli: [
        'Disturbi del Linguaggio: ritardi di linguaggio, dislalie (difficoltà di pronuncia), disprassia verbale.',
        'Disturbi dell\'Apprendimento (DSA): dislessia, disgrafia, disortografia, discalculia.',
        'Disturbi della Voce: raucedine, voce fioca, rieducazione post-chirurgica.',
        'Disturbi della Comunicazione: afasia (post-ictus), difficoltà legate ad autismo, demenza o sordità.',
        'Disturbi della Deglutizione (Disfagia): difficoltà a deglutire in età geriatrica e pediatrica.',
        'Collaborazione in équipe con neuropsichiatri, psicologi e insegnanti.',
      ],
      quando: 'Rivolgiti al logopedista per difficoltà nel linguaggio, nella lettura/scrittura, balbuzie, problemi di voce o difficoltà a deglutire.',
    },
    {
      nome: 'Neurologo',
      icon: 'psychology',
      intro: 'Medico specializzato nella diagnosi e nel trattamento delle patologie del sistema nervoso centrale (cervello, midollo) e periferico (nervi e muscoli).',
      dettagli: [
        'Visita Neurologica: valuta funzioni cognitive, forza muscolare, coordinazione, riflessi e sensibilità.',
        'Diagnosi: mal di testa persistenti, vertigini, formicolii, tremori, debolezza, disturbi della memoria.',
        'Esami Strumentali: risonanza magnetica, TAC, EEG, elettromiografia.',
        'Patologie Trattate: ictus, epilessia, Parkinson, Alzheimer, sclerosi multipla, cefalee, neuropatie.',
        'Non ricorre alla chirurgia — si distingue dal neurochirurgo.',
      ],
      quando: 'Consulta il neurologo per debolezza improvvisa, formicolii persistenti, difficoltà nel linguaggio, tremori, cefalee violente, disturbi della memoria o crisi convulsive.',
    },
    {
      nome: 'Neurochirurgo',
      icon: 'biotech',
      intro: 'Medico specializzato nel trattamento chirurgico di patologie del sistema nervoso centrale (cervello, midollo spinale) e periferico.',
      dettagli: [
        'Diagnosi e Visita: analisi di sintomi neurologici con TAC, risonanza magnetica ed elettromiografia.',
        'Chirurgia Cranica: tumori cerebrali, aneurismi, emorragie cerebrali, idrocefalo.',
        'Chirurgia Vertebrale: ernie del disco cervicali/lombari, stenosi spinali, fratture vertebrali.',
        'Chirurgia dei Nervi Periferici: sindrome del tunnel carpale.',
        'Neurochirurgia Funzionale: epilessia farmaco-resistente, Parkinson (stimolazione cerebrale profonda DBS).',
      ],
      quando: 'Rivolgiti al neurochirurgo per sintomi neurologici persistenti non rispondenti alle terapie conservative, traumi cranici o vertebrali.',
    },
    {
      nome: 'Oculista',
      icon: 'visibility',
      intro: 'Medico specializzato nella prevenzione, diagnosi e trattamento medico-chirurgico delle malattie dell\'occhio e dei disturbi della vista.',
      dettagli: [
        'Visita Oculistica Completa: acuità visiva, tono oculare e fondo oculare.',
        'Diagnosi e Cura: glaucoma, cataratta, maculopatie, distacco di retina.',
        'Chirurgia: interventi correttivi (chirurgia refrattiva, laser) o terapeutici.',
        'Prescrizione: lenti correttive e farmaci oftalmici.',
      ],
      quando: 'Effettua una visita periodicamente (specialmente dopo i 40 anni) o in presenza di visione offuscata, macchie nel campo visivo, dolore oculare o calo della vista.',
    },
    {
      nome: 'Ortopedico',
      icon: 'accessibility_new',
      intro: 'Medico chirurgo specializzato nella diagnosi, trattamento e prevenzione delle patologie del sistema muscolo-scheletrico: ossa, articolazioni, legamenti, tendini e muscoli.',
      dettagli: [
        'Diagnosi e Valutazione: esami clinici, radiografie, RMN, TC ed ecografie per identificare la causa dei problemi.',
        'Trattamenti Conservativi: infiltrazioni, farmaci, tutori, gessi, fisioterapia.',
        'Chirurgia Ortopedica: sostituzione di articolazioni con protesi (anca, ginocchio), riparazione legamenti (artroscopia), correzione deformità.',
        'Traumatologia Sportiva: lesioni meniscali, rottura del legamento crociato, tendiniti.',
      ],
      quando: 'Prenota una visita per dolore articolare o muscolare persistente, rigidità nei movimenti, gonfiore, o a seguito di traumi che compromettono la mobilità.',
    },
    {
      nome: 'Osteopata',
      icon: 'self_improvement',
      intro: 'Professionista sanitario che utilizza tecniche manuali non invasive per trattare disfunzioni del sistema muscolo-scheletrico, viscerale e craniosacrale.',
      dettagli: [
        'Valutazione Manuale: analisi della postura, mobilità articolare e tensione dei tessuti tramite palpazione.',
        'Trattamento Manuale: manipolazioni specifiche, trazioni e pressioni sulla colonna, articolazioni, muscoli e fascia.',
        'Aree di Intervento: mal di schiena, cervicalgia, dolori articolari, cefalee, problemi posturali, disfunzioni viscerali.',
        'Prevenzione: lavora per prevenire disfunzioni e mantenere lo stato di salute.',
        'Non utilizza farmaci — usa tecniche manuali per favorire il benessere globale del paziente.',
      ],
      quando: 'Rivolgiti all\'osteopata per mal di schiena, dolori muscolari e articolari, cefalee ricorrenti, problemi posturali o come prevenzione per mantenere il benessere fisico.',
    },
    {
      nome: 'Pneumologo',
      icon: 'air',
      intro: 'Medico specializzato nella diagnosi e cura delle malattie dell\'apparato respiratorio: polmoni, bronchi e vie aeree.',
      dettagli: [
        'Patologie Trattate: asma, BPCO, bronchiti croniche, enfisema, infezioni polmonari, apnee notturne.',
        'Visita: include spirometria per valutare la capacità respiratoria.',
        'Importante per fumatori ed ex-fumatori dopo i 35 anni per controllare la funzionalità polmonare.',
        'Gestione delle apnee notturne: russamento con apnee, secchezza delle fauci, sonnolenza diurna.',
      ],
      quando: 'Consulta lo pneumologo per tosse persistente da più di 3-4 settimane, difficoltà respiratoria, respiro sibilante, dolore al torace, o in caso di fumo ed esposizione a sostanze nocive.',
    },
    {
      nome: 'Podologo',
      icon: 'directions_walk',
      intro: 'Professionista sanitario laureato che cura patologie e anomalie del piede (unghie, cute, biomeccanica), prevenendo complicanze specialmente nel paziente diabetico.',
      dettagli: [
        'Trattamenti Dermatologici: ipercheratosi, callosità, tilomi.',
        'Cura delle Unghie: unghie incarnite, onicogrifosi (unghie ispessite).',
        'Prevenzione Piede Diabetico: fondamentale per prevenire ulcere e infezioni nei pazienti con diabete.',
        'Esami e Plantari: esami baropodometrici e progettazione di ortesi plantari personalizzate.',
      ],
      quando: 'Rivolgiti al podologo per dolore ai piedi, calli fastidiosi, unghie incarnite, verruche plantari, micosi o cambiamenti nella postura. Consigliato almeno un controllo annuale.',
    },
    {
      nome: 'Psicologo',
      icon: 'psychology_alt',
      intro: 'Professionista sanitario che promuove il benessere psicologico di individui, coppie e gruppi attraverso colloqui, test e strumenti scientifici.',
      dettagli: [
        'Sostegno Psicologico: aiuta ad affrontare lutti, separazioni, stress lavorativo o cambiamenti di vita.',
        'Diagnosi e Valutazione: colloqui clinici e test psicologici per comprendere il funzionamento cognitivo.',
        'Prevenzione: interviene per evitare l\'insorgere di disagi psicologici.',
        'Counseling: supporto per migliorare le relazioni familiari o lavorative.',
        'Non prescrive farmaci — si distingue dallo psichiatra.',
        'Può specializzarsi in psicoterapia (4 anni aggiuntivi).',
      ],
      quando: 'Rivolgiti allo psicologo per ansia, depressione, stress, difficoltà relazionali, lutti, attacchi di panico, problemi di autostima o semplicemente per un sostegno nel percorso di crescita personale.',
    },
    {
      nome: 'Urologo',
      icon: 'local_hospital',
      intro: 'Medico specializzato nella diagnosi e trattamento delle patologie dell\'apparato urinario e genitale maschile, incluse prostata, testicoli e reni.',
      dettagli: [
        'Apparato Urinario: calcolosi renale, tumori (reni, vescica), infezioni, incontinenza, vescica iperattiva.',
        'Apparato Genitale Maschile: ipertrofia prostatica benigna, prostatiti, tumore della prostata, varicocele.',
        'Andrologia: infertilità maschile, disfunzione erettile.',
        'Diagnostica e Chirurgia: uretrocistoscopia, ecografie transrettali, biopsie, interventi endoscopici e robotici.',
      ],
      quando: 'Consulta l\'urologo per sangue nelle urine, difficoltà a urinare, dolori lombari o ai testicoli, problemi di erezione o fertilità. Screening della prostata consigliato per uomini sopra i 50 anni.',
    },
  ];

  seleziona(s: Specialista): void {
    this.specialistaSelezionato = this.specialistaSelezionato?.nome === s.nome ? null : s;
  }

  prenotaVisita(nomeSpecialista: string): void {
    // Comunica lo specialista al form contatti tramite il servizio
    this.prenotazioneService.selezionaSpecialista(nomeSpecialista);
    // Scorre direttamente al form (non alla sezione intera)
    setTimeout(() => {
      const el = document.getElementById('prenota-form') ?? document.getElementById('contatti');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  vantaggi = [
    { icon: 'people',              titolo: 'Medici esperti',           testo: 'Professionisti qualificati e selezionati per competenza e passione.' },
    { icon: 'precision_manufacturing', titolo: 'Tecnologia avanzata', testo: 'Strumenti diagnostici moderni per interventi precisi e tempestivi.' },
    { icon: 'volunteer_activism',  titolo: 'Cure personalizzate',      testo: 'Ogni percorso terapeutico è costruito intorno alle esigenze del paziente.' },
    { icon: 'verified_user',       titolo: 'Qualità e sicurezza',      testo: 'Protocolli rigorosi e standard elevati per la tua tranquillità.' },
    { icon: 'thumb_up',            titolo: 'Senza lunghe attese',      testo: 'Appuntamenti rapidi per non rimandare la tua salute.' },
    { icon: 'credit_card',         titolo: 'Pagamenti flessibili',     testo: 'Soluzioni di pagamento personalizzate per rendere le cure accessibili.' },
  ];
}
