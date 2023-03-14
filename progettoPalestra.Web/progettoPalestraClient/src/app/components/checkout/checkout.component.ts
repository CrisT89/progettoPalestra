import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { ArticleDTO } from '../../models/Data/article.model';
import { CustomerDTO } from '../../models/Data/cliente.model';
import { CartService } from '../../services/cart.service';

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

  // nomeAquirente: string;
  customer: CustomerDTO = new CustomerDTO();

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper

  dialogDatePickerRef: MatDialogRef<TemplateRef<any>>;
  @ViewChild('datePicker', { static: false }) datePicker: TemplateRef<any>;
  @ViewChild('picker', { static: false }) picker: MatDatepicker<Date>;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService,
              private dialog: MatDialog) { }

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
        this.customer.ReceptionDate
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
      this.customer.ReceptionDate = values['DatePicker'];
    } else {
      this.customer.ReceptionDate = null;
    }
    
    // console.log(this.customer);
    
  }

  dummyCustomer() {
    this.customer.Name = "Cris";
    this.customer.Surname = "Dummy";
    this.customer.Email = "cris@test.it";
    this.customer.PhoneNumber = "123456789";
    this.customer.Adress = "via libera tutti, 1";
    this.customer.City = "Ascoli Piceno";
    this.customer.Cap = 77777;
    this.customer.Province = "AP";
    this.customer.State = "Italia";

    this.createForm();    
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
    console.log(this.customer);
    
  }
  

}




