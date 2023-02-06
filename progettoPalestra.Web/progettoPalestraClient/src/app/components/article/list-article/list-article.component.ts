import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigColumn, TypeColumn } from '@eqproject/eqp-table';
import { Subscription } from 'rxjs';
import { ArticleDTO } from '../../../models/Data/article.model';
import { ArticleService } from '../../../services/DataService/article.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit, OnDestroy {

  constructor(private articleService: ArticleService,
    private router: Router) { }

  articles: ArticleDTO[];
  columns: ConfigColumn[];
  subscription: Subscription;

  ngOnInit(): void {
    this.configureColumns();
    this.loadArticles();
    this.subscription = this.articleService.articleListChanged.subscribe(() => this.loadArticles());
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe(
      data => { this.articles = data },
      err => { DialogService.Error("Qualcosa è andato storto nella lettura degli articoli: " + err) }
    );
  }

  configureColumns() {
    this.columns = [
      { key: "Code", display: "Codice", styles: {} },
      { key: "Name", display: "Nome", styles: {} },
      { key: "Price", display: "Prezzo", styles: {} },
      {
        key: "action", display: "",
        type: TypeColumn.MenuAction, buttonMenuIcon: "more_vert", styles: { flex: "0 0 6%" },
        actions: [
          { name: "Modifica", icon: "create", fn: (element, index, col) => this.editArticle(element), disabled: false, hidden: false },
          { name: "Elimina", icon: "delete", fn: (element, index, col) => this.deleteArticle(element), disabled: false, hidden: false },
        ],
      },
    ];
  }

  editArticle(element: ArticleDTO) {
    //indirizzamento verso add-article.component in modalità edit
    this.router.navigate(['/newarticle', element.ID]);
  }

  deleteArticle(element: ArticleDTO) {
    this.articleService.deleteArticle(element.ID).subscribe();
  }

  onAddArticle() {
    this.router.navigate(['/newarticle']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
