import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigColumn, TypeColumn } from '@eqproject/eqp-table';
import { Subscription } from 'rxjs';
import { ArticleDTO } from '../../../models/Data/article.model';
import { cartArticle, CartService } from '../../../services/cart.service';



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

  constructor(private cartService: CartService) { }

  

  ngOnInit(): void {
    this.configureColumns();
    this.sub = this.cartService.cartListChanged
      .subscribe((res: ArticleDTO[]) => {
        this.articleList=res;
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

  onDecreaseQuantity(el: object) {
    this.cartService.decreaseQuantity(el);
    // this.cartService.cartListChanged.next(this.articleList);
  }

  onRemove(index: number) {
    this.cartService.removeArticle(index);
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
