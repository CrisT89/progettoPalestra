*** INFORMAZIONI UTILI PER FIX GRAFICI SULLA EQP-LOOKUP ****

*** INSERIMENTO DELLA EQP-LOOKUP DENTRO UNA MAT-DATATABLE / MAT-CELL ***
Sulla <mat-cell> che contiene la eqp-lookup aggiungere la classe [.contains-lookup] 

*** INSERIMENTO DELLA EQP-LOOKUP DENTRO UNA MAT-DIALOG ***
Andate sul .ts del componente che chiama la Dialog. Cercate l'invocazione della dialog: "this.dialog.open()" e sul secondo parametro inserite come nuovo parametro dell'oggetto che state passando: panelClass: 'contains-lookup'.

*** INSERIMENTO DELLA EQP-LOOKUP DENTRO UNA MAT-TAB ***
1. Seguire le istruzioni "CONFIGURAZIONE DEL SERVIZIO FIX TEMPLATE"
2. Sul <mat-tab-group> che contiene la EQP-LOOKUP aggiungere: class="contains-lookup" (selectedTabChange)="putTabsOverflowHidden()"
Nota: anche se una singola lookup si trova su un singolo tab, il fix va applicato su tutto il mat-tab-group
Esempio: <mat tab-group class="contains-lookup" (selectedTabChange)="putTabsOverflowHidden()">

3. All'interno del .ts del componente incollare questo codice all'interno della classe principale:

  putTabsOverflowHidden(){
    this.fixTemplateService.putTabsOverflowHidden(this.document,this.renderer);
  }

*** INSERIMENTO DELLA EQP-LOOKUP DENTRO UNA MAT-CARD ***
To Do. Effettuare dei test CSS sull'overflow dei container della Lookup come linea generale per trovare un fix.


*** CONFIGURAZIONE DEL SERVIZIO FIX TEMPLATE ***
- includere nel .ts del componente il servizio [fixtemplate.service.ts]:

    import { FixTemplateService } from '../../../../services/fixtemplate.service';

- inserire nel constructor la dichiarazione (o aggiungere solo le dichiarazioni mancanti): 

    constructor(
        public fixTemplateService: FixTemplateService,
        @Inject(DOCUMENT) private document: Document, 
        private renderer: Renderer2
    );

- includere le classi contenute nel constructor in cima al documento (o aggiungere solo le dichiarazioni mancanti):

    import { DOCUMENT } from '@angular/common';
    import { Inject, Renderer2 } from '@angular/core';    

