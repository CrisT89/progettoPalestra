import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { ArticleDTO } from '../../../models/Data/article.model';
import { CategoryDTO } from '../../../models/Data/category.model';
import { ArticleService } from '../../../services/DataService/article.service';
import { CategoryService } from '../../../services/DataService/category.service';

@Component({
  selector: 'app-article-cards',
  templateUrl: './article-cards.component.html',
  styleUrls: ['./article-cards.component.css']
})
export class ArticleCardsComponent implements OnInit {

  constructor(private articleService:ArticleService,
              private categoryService:CategoryService,
              private route: ActivatedRoute) { }

  articleList: ArticleDTO[];
  //categories: CategoryDTO[];
  inEvidence: boolean;

  ngOnInit(): void {
    this.articleService.getAllArticles()
    .subscribe(
      articles => this.articleList=articles);
    this.route.queryParams
      .subscribe(qparam => this.inEvidence = qparam['inEvidence']);
    
      
  }

}
