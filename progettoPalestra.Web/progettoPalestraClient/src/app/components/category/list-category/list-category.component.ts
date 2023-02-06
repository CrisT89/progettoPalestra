import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigColumn, EqpTableComponent, TypeColumn } from '@eqproject/eqp-table';
import { Subscription } from 'rxjs';
import { CategoryDTO } from '../../../models/Data/category.model';
import { CategoryService } from '../../../services/DataService/category.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit, OnDestroy {

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  categories: CategoryDTO[];
  columns: ConfigColumn[];
  subscription: Subscription;

  ngOnInit(): void {
    this.configureColumns();
    this.loadCategories();
    this.subscription = this.categoryService.categoryListChanged
      .subscribe(() => { this.loadCategories() });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => { this.categories = data },
      error => { DialogService.Error("Qualcosa è andato storto nella lettura delle categorie: " + error) });
    //console.log(this.eqpTable);
  }

  configureColumns() {
    this.columns = [
      { key: "Name", display: "Nome", styles: {} },
      { key: "Description", display: "Descrizione", styles: {} },
      { key: "Label", display: "Label", styles: {} },
      {
        key: "action", display: "",
        type: TypeColumn.MenuAction, buttonMenuIcon: "more_vert", styles: { flex: "0 0 6%" },
        actions: [
          { name: "Modifica", icon: "create", fn: (element, index, col) => this.editCategory(element), disabled: false, hidden: false },
          { name: "Elimina", icon: "delete", fn: (element, index, col) => this.delete(element), disabled: false, hidden: false },
        ],
      },
    ];
  }

  editCategory(el: CategoryDTO) {
    console.log("Indirizzamento verso componente add-category in edit-mode!!!");
    this.router.navigate(['/newcategory', el.ID]);
    console.log(el.ID);

  }

  delete(el: CategoryDTO) {
    this.categoryService.deleteCategory(el.ID).subscribe();
  }

  onAddCategory() {
    console.log("Indirizzamento verso componente add-category!!!");
    this.router.navigate(['/newcategory']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
