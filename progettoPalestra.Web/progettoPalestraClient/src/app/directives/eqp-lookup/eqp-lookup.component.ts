import { BehaviorSubject } from 'rxjs';
import { DialogService } from './../../services/dialog.service';
import { LookupService } from './../../services/lookup.service';
import { Component, OnInit, Input, Output, forwardRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, TemplateRef, EventEmitter, AfterViewInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgSelectComponent } from '@ng-select/ng-select';
import { LookupDTO } from '../../models/lookup.model';
import { ComplexLinqPredicateDTO } from '../../models/linqPredicate.model';
import { DynamicLoaderDirectiveData } from '../dynamic-loader/dynamic-loader.directive';
import { LinqPredicateDTO } from '@eqproject/eqp-filters';

@Component({
  selector: 'eqp-lookup',
  templateUrl: './eqp-lookup.component.html',
  styleUrls: ['./eqp-lookup.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EqpLookupComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EqpLookupComponent implements OnInit, AfterViewInit, ControlValueAccessor {

  onChange: any = () => { }
  onTouch: any = () => { }
  val: any = null;

  @ViewChild('dialogDynamic', { static: true }) dialogDynamic: TemplateRef<any>;

  /**
   * Viechild per la gestione diretta del componente di select
   */
  @ViewChild("ngselect", { static: true }) ngselect: NgSelectComponent;

  modalAdding: MatDialogRef<TemplateRef<any>>;


  /**
   * Label che sarà visibile come etichetta della lookup
   */
  @Input("placeholder") placeholder: any;

  /**
   * Proprietà che sarà bindata sull'etichetta della lookup, default: 'label'
   */
  @Input("bindLabel") bindLabel: string;

  /**
   * Datasource della lookup
   */
  @Input("items") items: Array<any>;

  /**
   * Datasource iniziale per la lookup, da usare se si vuole bypassare la chiamata al LookupController
   */
  @Input("initialItems") initialItems: Array<LookupDTO> = null;

  /**
   * Testo visualizzato in caso di risultati non trovati, se non specificato viene proposto un testo di default
   */
  @Input("notFoundText") notFoundText: string = 'Nessun risultato trovato';

  /**
   * Configurazione contenente il nome del componente, e gli eventuali parametri, da utilizzare
   * per la creazione di nuovi elementi dalla lookup
   */
  @Input("genericAddComponent") genericAddComponent: DynamicLoaderDirectiveData;

  /**
   * Definisce se la lookup accetta più valori, all'invio sul server sono gestiti come array di oggetti
   */
  @Input("isMultiple") isMultiple: boolean = false;

  /**
   * Definisce se la lookup accetta più valori, all'invio sul server sono gestiti come array di oggetti
   */
  @Input("clearSearchOnAdd") clearSearchOnAdd: boolean = false;

  /**
   * Definisce se è possibile digitare caratteri all'interno della lookup
   */
  @Input("isSearchable") isSearchable: boolean = true;

  /**
   * Rend er dinamico per una mole di dati elevata, utilizzare quando il datasource contiene molti elementi e risulta lento il caricamento dei dati
   */
  @Input("isVirtualScroll") isVirtualScroll: boolean = false;

  /**
   * Definisce se la lookup è solo in lettura
   */
  @Input("isReadonly") isReadonly: boolean = false;

  /**
   * Definisce se la lookup è obbligatorio che abbia un valore
   */
  @Input("isRequired") isRequired: boolean = false;

  /**
   * Indica se la modale in aggiunta avrà il pulsante di chiusura generico
   */
  @Input("isClosable") isClosable: boolean = false;

  @Input("isDisabled") isDisabled: boolean = false;

  /**
   * Nome dell'entità di tipo LookupDTO che sarà passato nel lookup.service/GetLookupEntities
   */
  @Input("entityType") entityType: string;

  /**
     * Scrivere in caso di utilizzo di formControlName, il nome del formGroup utilizzato nel tag <form>
     */
  @Input("formGroupInput") formGroupInput: any;

  /**
     * Nome del formControlName da utilizzare
     */
  @Input("formControlNameInput") formControlNameInput: any;

  @Output("valueSelected") valueSelected: EventEmitter<LookupDTO> = new EventEmitter<LookupDTO>();

  /**
 * ngModel da bindare
 */
  @Input("ngModelInput") ngModelInput: any;

  @Input("bindCompleteObject") bindCompleteObject: boolean = true;

  /**
   * Input da utilizzare nel caso in cui la lookup è contenuta in un dialog o mat-tab
   * e si hanno problemi di visualizzazione del menù dropdown, passare come input la stringa 'body'
   */
  @Input("appendToInput") appendToInput: string;

  /**
   * Permette di definire (in maniera opzionale) gli eventuali predicati standard da applicare nel recuperare gli item per la lookup
    */
  @Input() dataFilter: Array<LinqPredicateDTO> = null;

  /**
   * Permette di definire predicati complessi per la gestione di where part con condizioni complesse messe in OR tra loro
   * (Esempio: grup pi di condizioni che contengono sia AND che OR e che devono essere messe in OR tra loro)
   */
  @Input() complexDataFilter: Array<ComplexLinqPredicateDTO> = null;


  /**
   * Evento scatenato al cambiare del valore della select
   */
  @Output() ngModelInputChange: EventEmitter<any> = new EventEmitter<any>();

  private _data = new BehaviorSubject<any[]>([]);

  // change data to use getter and setter
  @Input()
  set data(value) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  };

  get data() {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue();
  }


  constructor(private lookupService: LookupService, private dialog: MatDialog, private elementRef: ElementRef) { }


  ngOnInit(): void {

    //Se la lookup è obbligatoria aggiunge l'asterisco al placeholder
    if (this.isRequired == true)
      this.placeholder += " *";

    this.reloadData();
  }

  ngAfterViewInit() {
    // Se viene passato in input il componente di add, aggiungo il pulsante di add nell'ng-select
    var self = this;
    if (this.genericAddComponent) {
      //Il pulsante di ADD viene aggiunto solo SE:
      // - In input NON è presente nessun form group
      // - In input E' PRESENTE un form group e tale form group NON RISULTA essere disabilitato
      if(this.formGroupInput == null || this.formGroupInput == undefined || (this.formGroupInput != null && this.formGroupInput != undefined && this.formGroupInput.disabled != true))
      {
        var addButton = this.elementRef.nativeElement.querySelector('.ng-select-container');
        let tooltip = "Aggiungi nuovo";
        addButton.insertAdjacentHTML('beforeend', '<span id="addButton" class="lookup-add-button ng-add-wrapper ng-star-inserted" title="' + tooltip + '" ><span aria-hidden="true" class= "ng-add" ><i class="fa fa-plus" aria-hidden="true"></i></span></span>');
        if (document.getElementById("addButton")) {
          document.getElementById("addButton").onclick = function () {
            self.openModalComponent();
          }
        }
      }

    }
  }


  /**
   * Al change dei valori della select, aggiorno con l'emit il valore
   * @param event
   */
  onChangeSelect(event) {
    let realValue = null;
    if (this.bindCompleteObject == false)
      realValue = this.isMultiple == true ? event.map(l => l.ID) : event.ID;
    else
      realValue =  event;

    if (this.ngModelInputChange != null) {
      this.ngModelInputChange.emit(realValue);
      this.value = realValue;
    }
  }


  reloadData(selectedItemID = null) {
    if (this.entityType == null) {
      DialogService.Error("Non è stato possibile recuperare il nome dell'entità");
    }
    else if(this.initialItems != null && this.initialItems != undefined) {
      this.items = this.initialItems;
      //Se è stato richiesto di forzare la selezione a seguito del reload allora recupera l'elemento dato l'ID e lo valorizza nel controllo (questo caso si presenta quando dopo aver
        //aggiunto un nuovo elemento dalla lookup viene ricaricato il datasource e bisogna preselezionare la lookup con l'elemento appena aggiunto)
        if (selectedItemID != null && selectedItemID != undefined) {
          let selectedValue = this.items.find(l => l.ID == selectedItemID);
          if (this.ngModelInputChange != null) {
            this.ngModelInputChange.emit(selectedValue);
            this.value = selectedValue;
          }
        }
    }
    else {
      this.lookupService.GetLookupEntities(this.entityType, this.dataFilter, this.complexDataFilter).then((res) => {
        this.items = res;

        //Se è stato richiesto di forzare la selezione a seguito del reload allora recupera l'elemento dato l'ID e lo valorizza nel controllo (questo caso si presenta quando dopo aver
        //aggiunto un nuovo elemento dalla lookup viene ricaricato il datasource e bisogna preselezionare la lookup con l'elemento appena aggiunto)
        if (selectedItemID != null && selectedItemID != undefined) {
          let selectedValue = this.items.find(l => l.ID == selectedItemID);
          if (this.ngModelInputChange != null) {
            this.ngModelInputChange.emit(selectedValue);
            this.value = selectedValue;
          }
        }
      })
    }
  }

  // Sezione two way bindings: Necessario per il funzionamento corretto del ControlValueAccessor (binding ngModel tra più componenti)
  set value(val) {
    this.val = val

    this.onChange(val)
    this.onTouch(val)

    //Se è stato passato un evento di output allora lo invoca passando l'oggetto selezionato dalla lookup
    if (this.valueSelected)
      this.valueSelected.emit(this.val);
  }

  writeValue(value: any) {
    this.value = value
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }
  // Fine sezione two way bindings

  openModalComponent() {

    //SUBSCRIBE PER RICARICARE I DATI DOPO IL SALVATAGGIO SOLTANTO SULLA LOOKUP CORRENTE
    if (this.lookupService.lookupAddingComplete.observers == null)
      this.lookupService.lookupAddingComplete = new EventEmitter<any>();

    this.lookupService.lookupAddingComplete.subscribe((res) => {
      this.lookupService.lookupAddingComplete.unsubscribe();

      //Chiude la modale di aggiunta elemento
      if (this.modalAdding)
        this.modalAdding.close();

      //Se il parametro dell'emit è popolato correttamente con l'ID dell'elemento salvato allora ricarica il datasource della lookup e seleziona in automatico l'elemento appena aggiunto
      if (res != null && res != undefined && res > 0)
        this.reloadData(res);
    });

    this.modalAdding = this.dialog.open(this.dialogDynamic,
      { disableClose: true, closeOnNavigation: false, minWidth: "70%" }
    );
  }

  updateInitialItems(items: Array<LookupDTO>) {
    this.initialItems = items;
    this.reloadData();
  }
}
