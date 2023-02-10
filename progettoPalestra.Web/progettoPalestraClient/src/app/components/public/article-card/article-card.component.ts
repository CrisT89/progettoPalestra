import { Component, Input, OnInit } from '@angular/core';
import { ArticleDTO } from '../../../models/Data/article.model';
import { CategoryDTO } from '../../../models/Data/category.model';
import { CategoryService } from '../../../services/DataService/category.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }
  @Input() article: ArticleDTO;
  @Input() index: number;
  categoryName: string;
  category: CategoryDTO;

  ngOnInit(): void {
    this.categoryService.getById(this.article.FK_Category)
    .subscribe(res=>{this.category=res;
      this.categoryName=this.category.Name;
    });
  }

}
