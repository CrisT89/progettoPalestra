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
  //articleInEvidenceList: ArticleDTO[];
  //categories: CategoryDTO[];
  inEvidence: string;
  category_Id: number;
  category_Name: string;
  inByCategory: boolean = false;

  ngOnInit(): void {
    this.route.params
      .subscribe(param => {
        this.inEvidence = param['inEvidence'];
        this.category_Id = param['id'];
        this.loadArticles(this.inEvidence, this.category_Id);
        if(this.category_Id) {
          this.categoryService.getById(this.category_Id).subscribe(c => this.category_Name = c.Name);
        }
      });
    }

  loadArticles(evidence: string, id: number) {
      if (evidence==null && id==null) {
        this.inByCategory = false;
        this.articleService.getAllArticles()
        .subscribe(articles => this.articleList=articles);
      }
      if (evidence=='inEvidence') {
        this.inByCategory = false;
        this.articleService.getInEvidence()
        .subscribe(articles => this.articleList = articles);
      }
      if (id) {
        this.inByCategory = true;
        this.articleService.getByCategory(id)
        .subscribe(articles => this.articleList = articles);
      }
    }
  

}
