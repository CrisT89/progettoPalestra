import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ArticleDTO } from '../../models/Data/article.model';
import { RigaOrdineDTO } from '../../models/Data/riga-ordine.model';
import { TestataOrdineDTO } from '../../models/Data/testata-ordine.model';
import { MailContact, MailMessageDTO } from '../../models/mailMessage.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  displayedColumns: string[] = ['Name', 'quantity','totalPrice'];
  datePickerCheck: boolean;
  minDate: Date;
  maxDate: Date;
  

  articleList: ArticleDTO[];
  totalPrice: number;
  righeOrdine: RigaOrdineDTO[] = [];

  // nomeAquirente: string;
  customer: TestataOrdineDTO = new TestataOrdineDTO();

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper

  dialogDatePickerRef: MatDialogRef<TemplateRef<any>>;
  @ViewChild('datePicker', { static: false }) datePicker: TemplateRef<any>;
  @ViewChild('picker', { static: false }) picker: MatDatepicker<Date>;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private dialog: MatDialog,
              private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.articleList = this.cartService.getList();
    this.totalPrice = this.cartService.getTotalPrice();
    this.createForm();
    const today = new Date();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(today.getDate() + 3);
    this.maxDate.setDate(today.getDate() + 50);

  }

  createForm() {
    this.checkoutForm = this.formBuilder.group({
      // addFormControlHere
      Name: [
        this.customer.Name, [Validators.required]
      ],
      Surname: [
        this.customer.Surname,
        [Validators.required],
      ],
      Email: [
        this.customer.Email,
        [Validators.required, Validators.email],
      ],
      PhoneNumber: [
        this.customer.PhoneNumber,
        [Validators.required],
      ],
      Adress: [
        this.customer.Adress,
        [Validators.required],
      ],
      City: [
        this.customer.City,
        [Validators.required],
      ],
      CAP: [
        this.customer.Cap,
        [Validators.required],
      ],
      Province: [
        this.customer.Province,
        [Validators.required],
      ],
      State: [
        this.customer.State,
        [Validators.required],
      ],
      DatePicker: [
        this.customer.PreferredDate
      ]
    
    });
  }

  selectedTabCounter: number = 0;
  maxNumberOfTabs: number = 2;

  complete() {
    this.stepper.selected.completed = true;
    this.stepper.selected.editable = false;
    // this.selectedTabCounter += 1;
    this.stepper.next();
  }

  submit() {
    const values = this.checkoutForm.value;
    this.customer.Name = values['Name'];
    this.customer.Surname = values['Surname'];
    this.customer.Email = values['Email'];
    this.customer.PhoneNumber = values['PhoneNumber'];
    this.customer.Adress = values['Adress'];
    this.customer.City = values['City'];
    this.customer.Cap = values['CAP'];
    this.customer.Province = values['Province'];
    this.customer.State = values['State'];
    if (this.datePickerCheck && values['DatePicker']) 
    {
      this.customer.PreferredDate = values['DatePicker'];
    } else {
      this.customer.PreferredDate = null;
    }
    
    console.log(this.customer.PreferredDate);
    
  }

  dummyCustomer() {
    this.customer.Name = "Cris";
    this.customer.Surname = "Dummy";
    this.customer.Email = "cris.varie.89@gmail.com";
    this.customer.PhoneNumber = "123456789";
    this.customer.Adress = "via libera tutti, 1";
    this.customer.City = "Ascoli Piceno";
    this.customer.Cap = 77777;
    this.customer.Province = "AP";
    this.customer.State = "Italia";

    this.createForm(); 
    // this.orderService.getById(2).subscribe(res => console.log(res));
      
  }

  // openDatePicker() {
  //   this.dialogDatePickerRef = this.dialog.open(this.datePicker, {
  //     disableClose: false,
  //     hasBackdrop: true,
  //     autoFocus: false,
  //     minWidth: '50%',
  //     minHeight: '150px'
  //   });
  //   this.picker.open();
  // }

  onComplete() {
    this.righeOrdine = this.creaRighe(this.articleList);
    this.customer.RigheOrdine = this.righeOrdine;
    this.customer.OrderTotal = this.totalPrice;
    this.customer.Status = 1;
    this.customer.OrderDate = new Date();
    this.orderService.saveOrder(this.customer)
    .subscribe(orderID => {
      this.SendSummaryMail(this.customer, orderID);
      Swal.fire({
        title: "Operazione Completata!",
        html: "Ordine completato con successo. Una mail di riepilogo è stata inviata all'indirizzo indicato.",
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "OK",
        preConfirm: ()=> {
          this.cartService.resetCart();
          this.router.navigate(["public-home/articles"]);
          console.log("OK");
          
        }
      });
    });
      
    // console.log(this.customer);
    
  }

  creaRighe(articleList: ArticleDTO[]): RigaOrdineDTO[] {
    let righe: RigaOrdineDTO[] = [];
    articleList.forEach(article => {
      let riga = new RigaOrdineDTO();
      riga.Quantity = article.quantity;
      riga.UnitaryPrice = article.Price;
      if (article.Iva) {
        riga.Iva = article.Iva;
      } else {
        riga.Iva = 0;
      }
      riga.Total = article.totalPrice;
      riga.FK_Article = article.ID;
      riga.Name = article.Name;
      righe.push(riga);
    })
    return righe;
  }

  SendSummaryMail(ordine: TestataOrdineDTO, ID: number) {
    let mail = new MailMessageDTO();

    let recipient = new MailContact();
    recipient.Name = ordine.Name;
    recipient.Surname = ordine.Surname;
    recipient.EmailAdress = ordine.Email;
    mail.Recipient = recipient;

    mail.Order = ordine;

    mail.Subject = "Riepilogo ordine n. " + ID;
    // mail.Body = "...elenco a";

    this.orderService.sendMailToUser(mail).subscribe();
  }

  // SendAdminMail(ID: number) {

  // }
  

}




