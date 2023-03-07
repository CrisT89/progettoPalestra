import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterConfig, FilterCvlConfig, InputType, LinqPredicateDTO, WherePartType } from '@eqproject/eqp-filters';
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
  inAllArticles: boolean = false;

  filters: Array<FilterConfig> = new Array<FilterConfig>();
  categoryNameDictionary: {key: number, value: string}[] = [];

  ngOnInit(): void {
    this.route.params
      .subscribe(param => {
        this.inEvidence = param['inEvidence'];
        this.category_Id = param['id'];
        this.loadArticles(this.inEvidence, this.category_Id);
        if(this.category_Id) {
          this.categoryService.getById(this.category_Id).subscribe(c => this.category_Name = c.Name);
        } else if (!this.category_Id && !this.inEvidence) {
          this.categoryService.getAllCategories().subscribe(
            c => c.forEach(category => this.categoryNameDictionary.push({key: category.ID, value: category.Name})))
        }
      });
      this.configureFilters();
      // console.log(this.categoryNameDictionary);
      
    }

  loadArticles(evidence: string, id: number) {
      if (evidence==null && id==null) {
        this.inByCategory = false;
        this.inAllArticles = true;
        this.articleService.getAllArticles()
        .subscribe(articles => this.articleList=articles);
      }
      if (evidence=='inEvidence') {
        this.inByCategory = false;
        this.inAllArticles = false;
        this.articleService.getInEvidence()
        .subscribe(articles => this.articleList = articles);
      }
      if (id) {
        this.inByCategory = true;
        this.inAllArticles = false;
        this.articleService.getByCategory(id)
        .subscribe(articles => this.articleList = articles);
      }
    }

    

    configureFilters() {

      let nameFilter: FilterConfig = FilterConfig.CreateStandardFilterConfig("Name_ID", "Nome", "Name", InputType.Text, WherePartType.StringContains);
      nameFilter.PreventRemoval = false;
      this.filters.push(nameFilter);

      let descriptionFilter: FilterConfig = FilterConfig.CreateStandardFilterConfig("Description_ID", "Descrizione", "Description", InputType.Text, WherePartType.StringContains);
      descriptionFilter.PreventRemoval = false;
      this.filters.push(descriptionFilter);

      let cvlConfig: FilterCvlConfig = FilterCvlConfig.CreateFilterCVLConfig(null, this.categoryNameDictionary, "key", "value", true, true, true, null, false);
    let cvlFilter: FilterConfig = FilterConfig.CreateStandardFilterConfig("Category_ID", "Categoria", "FK_Category", InputType.Cvl, WherePartType.Equal, null, cvlConfig);
    this.filters.push(cvlFilter);
    }

    filtersSelected($event) {
      // console.log($event);
      let linqPredicates: LinqPredicateDTO[] = $event;
      this.articleService.getFilteredArticles(linqPredicates).subscribe(
        articles => {
           this.articleList = articles;
          // console.log(articles);
          
        }
      );
    }
  

}
