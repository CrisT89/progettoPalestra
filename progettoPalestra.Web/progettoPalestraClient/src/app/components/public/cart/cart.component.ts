import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigColumn, TypeColumn } from '@eqproject/eqp-table';
import { Subscription } from 'rxjs';
import { ArticleDTO } from '../../../models/Data/article.model';
import { CartService } from '../../../services/cart.service';
import { CheckoutComponent } from '../../checkout/checkout.component';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  articleList: ArticleDTO[];
  columns: ConfigColumn[];
  sub: Subscription;
  cartTotalPrice: number;

  checkoutForm: FormGroup;
  displayedColumns: string[] = ['Name', 'quantity','totalPrice'];

  nomeAquirente: string;

  dialogCheckoutRef: MatDialogRef<CheckoutComponent>;
  // @ViewChild('CartCheckout', { static: false }) CartCheckout: TemplateRef<any>;

  constructor(private cartService: CartService,
              private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) { }

  

  ngOnInit(): void {
    // this.articleList = this.cartService.fromLocalStorage();
    this.configureColumns();
    // console.log(this.articleList);
    
    this.sub = this.cartService.cartListChanged
      .subscribe((res: ArticleDTO[]) => {
        this.articleList=res;
        // this.cartService.toLocalStorage(res);
        // this.cartService.fromLocalStorage();
        this.cartTotalPrice = this.cartService.cartTotalPrice;});
    this.articleList = this.cartService.getList(); 
    this.cartTotalPrice = this.cartService.cartTotalPrice; 
    
  }

  configureColumns() {
    this.columns = [
      { key: "Name", display: "Nome", styles: { cellAlignment: 3} },
      { key: "quantity", display: "Quantità", styles: { cellAlignment: 3 } },
      { key: "totalPrice", display: "Prezzo", numberPipe: 3, currencyPipeCode: "EUR", styles: {  cellAlignment: 3} },
    {
      key: "action", display: "",
      type: TypeColumn.SimpleAction, styles: {  },
      actions: [
        { name: "", icon: "remove", fn: (element, index, col) => this.onDecreaseQuantity(element), disabled: element => element['quantity']==1, hidden: false },
      { name: "", icon: "add", fn: (element, index, col) => this.onIncreaseQuantity(element), disabled: false, hidden: false },
      { name: "", icon: "cancel", fn: (element, index, col) => this.onRemove(index), disabled: false, hidden: false },
      ],
    },
    
    ];
  }

  onIncreaseQuantity(el:ArticleDTO) {
    this.cartService.increaseQuantity(el);
    // this.cartService.cartListChanged.next(this.articleList);
  }

  onDecreaseQuantity(el: ArticleDTO) {
    this.cartService.decreaseQuantity(el);
    // this.cartService.cartListChanged.next(this.articleList);
  }

  onRemove(index: number) {
    this.cartService.removeArticle(index);
    
  }

  selectedStepCounter: number = 0;
  maxNumberOfSteps: number = 2;
  
  createForm() {
    this.checkoutForm = this.formBuilder.group({
      // addFormControlHere
      Name: [
        this.nomeAquirente, []
      ],
    });
  }
  
  saveFunctionName(exit: boolean = true) {
    const values: Object = this.checkoutForm.value;
    /*bind the inserted values*/
    if (exit) {
      /* save */
      this.exitFunctionName()
    } else {
      /* save */
    }
  
    console.log(values, "save!");
  }
  
  exitFunctionName() {
    // this.location.back();
  }

  onCompletePurchase() {
    // localStorage.removeItem(this.cartService.CART_LIST);
    // this.cartService.resetCart();
    // this.router.navigate(["/public-home"]);

    // this.createForm();


    this.dialogCheckoutRef = this.dialog.open(CheckoutComponent, {
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      minWidth: '75%',
      minHeight: '150px'
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
