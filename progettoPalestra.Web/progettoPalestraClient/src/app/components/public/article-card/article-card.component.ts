import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleDTO } from '../../../models/Data/article.model';
import { CategoryDTO } from '../../../models/Data/category.model';
import { CartService } from '../../../services/cart.service';
import { CategoryService } from '../../../services/DataService/category.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit, OnDestroy {

  constructor(private categoryService: CategoryService,
              private cartService: CartService) { }

  @Input() article: ArticleDTO;
  @Input() index: number;
  categoryName: string;
  category: CategoryDTO;
  @Input() inByCategory: boolean;
  sub: Subscription;
  articleCount: number;

  ngOnInit(): void {
    this.categoryService.getById(this.article.FK_Category)
    .subscribe(res=>{this.category=res;
      this.categoryName=this.category.Name;
    });
    
    // let inCartList = this.cartService.getList().some(element => element.ID===this.article.ID);
    this.articleCount = this.cartService.getArticleQuantity(this.article);
    
    // console.log(this.article.Name, "articleCount: ", this.articleCount);
    
    this.sub = this.cartService.articleAmountChanged.subscribe(
      () => {
        this.articleCount = this.cartService.getArticleQuantity(this.article);
        
      }
    );
    
  }

  onAddToCart() {
    // console.log(this.article);
    this.cartService.addArticle(this.article);
    // console.log(this.article.Name, "articleCount: ", this.articleCount);
    //console.log(this.cartService.getArticleQuantity(this.article));
    // console.log(this.article);
    
    // this.articleCount = this.cartService.getArticleQuantity(this.article);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
