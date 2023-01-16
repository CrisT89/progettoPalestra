import { UserService } from './../../services/user.service';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { navItems } from '../../_nav';
import { Subscription } from 'rxjs';
import * as signalR from "@microsoft/signalr";
import { environment } from '../../../environments/environment';
import { DialogService } from '../../services/dialog.service';
import { UserDTO } from '../../models/generics/user.model';
import { NotificationDetailDTO } from '../../models/notification-center/notificationDetail.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { EventHandlerService } from '../../services/eventHandler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

  currentUser: UserDTO;
  public sidebarMinimized = false;
  public navItems = navItems;

  enableNotificationSystem: boolean = environment.enableNotificationSystem;
  notificationCount: number = 0;
  notificationList: Array<NotificationDetailDTO> = new Array<NotificationDetailDTO>();
  notificationReadSubscription: Subscription;
  socketReloadCounter: number = 0;
  private hubConnection: signalR.HubConnection;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  // Dialog per la visualizzazione di una notifica
  dialogViewNotificationRef: MatDialogRef<TemplateRef<any>>;
  @ViewChild('dialogViewNotification', { static: false }) dialogViewNotification: TemplateRef<any>;
  selectedNotification: NotificationDetailDTO;

  /**
   * Nasconde la sidebar
   * @param e
  */
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private eventHandlerService: EventHandlerService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.resetRouteReuseStrategy();
  }

  /**
 * Reimposta la strategia per il reload delle rotte al valore di default.
 * Questo metodo viene richiamato ogni volta che si inizializza il componente, cioè in due momenti: quando viene avviata l'app dopo la login e quando si
 * cambia la company selezionata (in quest'ultimo viene forzato il reload della rotta corrente per potere aggiornare i dati).
 */
  resetRouteReuseStrategy() {
    this.router.routeReuseStrategy.shouldReuseRoute = (future, curr) => { return future.routeConfig === curr.routeConfig };
    this.router.onSameUrlNavigation = 'ignore';
  }

  ngOnInit() {
    //Se si vuole avviare il sistema di notifiche ed è presente l'utente autenticato
    //allora avvia i servizi per la ricezione delle notifiche push
    if (this.enableNotificationSystem && this.authService.getCurrentUser() != null && this.authService.getCurrentUser() != undefined) {
      this.initializeSocketNotificationConnection();
    }
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  /**
   * Logout
   */
  async logout() {
    await this.hubConnection.stop().catch((err) => { console.log(err); });
    this.hubConnection = null;
    this.authService.logout();
  }

  /**
   * Apre la sezione profilo utente
   */
  viewProfile() {
    this.router.navigate(['/profile'], { relativeTo: this.activatedRoute });
  }

  //#region Gestione Hub notifiche SignalR

  async initializeSocketNotificationConnection() {
    await this.startConnection();
    this.loadUnreadNotification(false);
    this.notificationReadSubscription = this.eventHandlerService.subscribe(
      'NotificationReadEvent',
      (response) => {
        this.notificationCount = (this.notificationCount > 0 ? this.notificationCount - 1 : 0);
      }
    );
  }

  /**
  * Costruisce una connessione con l'hub che gestisce il web socket per l'invio delle notifiche in tempo reale
  * e la avvia.
  */
  public async startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.apiUrl + '/NotificationHub', {
        // skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection.onclose((error: Error) => {
      if (error) {
        console.log(error);
        this.retrySocketConnection();
      }
    });

    this.NewConnection();
    this.NotificationDataUpdated();

    await this.hubConnection.start()
      .then(() => { this.onConnection(); })
      .catch(err => {
        console.log('Error while starting connection: ' + err);
        this.retrySocketConnection();
      });

    if (this.hubConnection.state == signalR.HubConnectionState.Connected)
      this.socketReloadCounter = 0;
  }

  /**
   * Metodo per tentate di riconnettersi al socket delle notifiche quando la connessione va giù.
   * Viene fatto un tentativo ogni 5 secondi per un massimo di 5 volte.
   */
  retrySocketConnection() {
    if (this.socketReloadCounter < 5) {
      setTimeout(async () => {
        this.socketReloadCounter = this.socketReloadCounter + 1;
        console.log("Attempt to re-establish connection with the notification socket number " + (this.socketReloadCounter) + "...")

        await this.startConnection();

        if (this.socketReloadCounter == 5) {
          console.log("Connection to notification socket failed. Reload the page to try Again.");
          DialogService.Warning("Connessione al sistema di notifiche non riuscita. Ricaricare la pagina per riprovare.", "Attenzione!");
        }
      }, 5000);
    }
  }

  /**
   * Una volta aperta la connessione invoca il metodo "Connect" dell'hub per registrare la connessione dell'utente loggato
   */
  public onConnection() {
    // TODO: Sostituire il velore 1 usato come test con l'ID dell'utente loggato!!
    //       In caso di entità con ID stringa modificare il metodo "Connect" nella classe NotificationHub.cs all'interno del progetto web.
    this.hubConnection.invoke('Connect', 1);
  }


  public NewConnection() {
    this.hubConnection.on('MyConnectionId', (connectionID) => {
      console.log("Successfully connected to notification hub.")
    });
  }

  /**
   * Metodo chiamato quando l'hub notifica all'utente loggato la ricezione di una nuova notifica.
   * Aumenta il contatore di 1, mostra il toast con il titolo della notifica ricevuta e emette l'evento "NotificationUpdateEvent".
   */
  public NotificationDataUpdated() {
    this.hubConnection.on('NotificationDataUpdate', async (notificationMessage) => {
      this.notificationCount = this.notificationCount > 0 ? (this.notificationCount + 1) : 1;
      await this.loadUnreadNotification(false);
      DialogService.ShowNewNotification(notificationMessage, null);
      this.eventHandlerService.broadcast({ name: 'NotificationUpdateEvent', content: '' });
    });
  }

  /**
   * Carica le notifiche non lette dell'utente loggato.
   * Se viene passato il parametro a true apre la tendina delle notifiche.
   * @param openDropdown
   */
  async loadUnreadNotification(openDropdown: boolean = true) {
    this.notificationList = new Array<NotificationDetailDTO>();
    await this.notificationService.getNotifications(true)
      .then(res => {
        this.notificationCount = (res && res.length > 0 ? res.length : 0);
        this.notificationList = res;
        // Se le notifiche hanno bisogno di essere tradotte o vanno sostituiti i placeholder 
        // bisogna usare la riga qui sotto. Il template di default esegue queste operazioni lato server
        // quando le notifiche vengono recuperate.
        // this.notificationList = res ? this.notificationService.replaceNotificationsPlaceholders(res) : new Array<NotificationDetailDTO>();
        if (openDropdown)
          this.trigger.openMenu();
      })
      .catch((err) => { DialogService.Error(err.message); });
  }

  /**
   * Se viene aperta una notifica non letta salva data/ora di lettura e apre il dialog per la visualizzazione della stessa.
   * @param notificationDetail
   */
  readNotification(notificationDetail: NotificationDetailDTO) {
    if (!notificationDetail.ReadDate) {
      this.notificationService.markAsRead(notificationDetail.ID)
        .then((res) => {
          notificationDetail.ReadDate = res;
          this.eventHandlerService.broadcast({ name: 'NotificationReadEvent', content: { ReadDate: res, ID: notificationDetail.ID } });
        })
        .catch((err) => { DialogService.Error(err.message); });
    }
    this.selectedNotification = notificationDetail;
    this.dialogViewNotificationRef = this.dialog.open(this.dialogViewNotification, {
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      width: '40%',
    });
  }

  /**
 * Redirect alla lista delle notifiche ricevute dall'utente.
 */
  goToNotificationList() {
    this.router.navigate(['/list-notifications'], { relativeTo: this.activatedRoute });
  }

  //#endregion
}
