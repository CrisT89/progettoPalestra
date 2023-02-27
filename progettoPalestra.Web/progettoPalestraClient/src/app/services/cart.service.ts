import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { ArticleDTO } from "../models/Data/article.model";

export interface cartArticle {
    name: string;
    quantity: number;
    price: number;
    totalPrice?: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

    public cartList: ArticleDTO[] = [];
    cartListChanged = new Subject<ArticleDTO[]>();
    articleAmountChanged = new Subject<void>();
    public articleCount: number = 0;
    public cartTotalPrice: number = 0;

    constructor() { }

    addArticle(article: ArticleDTO) {
        let alreadyInList = this.inCartList(article);
       
        if (!alreadyInList) {
            this.firstInstance(article);
            // article.quantity = 0;
            // article.totalPrice = 0;
            // this.increaseQuantity(article);
            // this.cartList.push(article);
            // console.log(article.Name, "articleCount in cartservice: ", article.quantity);
            // this.cartTotalPrice += article.Price;
            // this.articleCount++;
            // this.cartListChanged.next(this.cartList.slice());
            // this.articleAmountChanged.next(article['quantity']);
        } else {
            // console.log(this.cartList.find((element: ArticleDTO)=>element.ID===article.ID));
            let articleToEdit = this.cartList.find((element: ArticleDTO)=>element.ID===article.ID);
            this.increaseQuantity(articleToEdit); 
            // console.log(article.Name, "articleCount in cartservice: ", article.quantity);

            // articleToEdit['totalPrice'] = articleToEdit.Price * articleToEdit['quantity'];
            
        }
        
        
    }

    getList() {
        return this.cartList.slice();
    }

    firstInstance(article: ArticleDTO) {
        article.quantity = 1;
        article.totalPrice = article.Price;
        this.articleCount++;
        this.cartTotalPrice += article.Price;
        this.cartList.push(article);
        this.cartListChanged.next(this.getList());
        this.articleAmountChanged.next();
    }

    increaseQuantity(article: ArticleDTO) {
        article.quantity += 1;
        this.articleCount++;
        this.updateArticlePrice(article);
        this.cartTotalPrice += article.Price;
        this.cartListChanged.next(this.getList());
        this.articleAmountChanged.next();
    }

    updateArticlePrice(article: ArticleDTO) {
        article.totalPrice = article.Price * article.quantity;
    }

    decreaseQuantity(article: object) {
        article['quantity'] -= 1;
        this.articleCount--;
        //this.updateArticlePrice(article);
        this.cartTotalPrice -= article['Price'];
        this.cartListChanged.next(this.getList());
        this.articleAmountChanged.next();
    }

    removeArticle(index: number) {
        let removedArticle =  this.cartList.splice(index,1);
        let removedQuantity = removedArticle[0]['quantity'];
        this.articleCount -= removedQuantity;
        this.cartTotalPrice -= removedQuantity * removedArticle[0]['Price'];
        this.cartListChanged.next(this.getList());
        this.articleAmountChanged.next();

    }

    getArticleQuantity(article: ArticleDTO) {
        let inList = this.inCartList(article)
        if (inList) {
            let articleInCart = this.cartList.find(element => element.ID === article.ID);
            return articleInCart.quantity;
        }
        // else {
           
        //     return 0;
        // }
    }

    inCartList(article: ArticleDTO) {
        return this.cartList.some((element: ArticleDTO)=>element.ID===article.ID);
    }

}