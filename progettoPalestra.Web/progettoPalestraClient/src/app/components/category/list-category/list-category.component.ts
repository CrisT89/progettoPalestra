import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigColumn, TypeColumn } from '@eqproject/eqp-table';
import { CategoryDTO } from '../../../models/Data/category.model';
import { CategoryService } from '../../../services/DataService/category.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    private route: ActivatedRoute) 
    { 
    this.configureColumns();
  }

  categories: Array<CategoryDTO> = new Array<CategoryDTO>();
  columns: ConfigColumn[];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {this.categories = data}, 
      error => {DialogService.Error("Qualcosa è andato storto nella lettura delle categorie: " + error)});
  }
  
  configureColumns() {
    this.columns = [
    { key: "Name", display: "Nome", styles: { } },
    { key: "Description", display: "Descrizione", styles: {  } },
    { key: "Label", display: "Label", styles: {  } },
    {
      key: "action", display: "",
      type: TypeColumn.MenuAction, buttonMenuIcon: "more_vert", styles: { flex: "0 0 6%" },
      actions: [
      { name: "Modifica", icon: "create", fn: (element, index, col) => this.editCategory(element, index, col), disabled: false, hidden: false },
      { name: "Elimina", icon: "delete", fn: (element, index, col) => this.functionName(element, index, col), disabled: true, hidden: false },
      ],
    },
    ];
  }

  editCategory(el, ind, col) {
    console.log("Indirizzamento verso componente add-category in edit-mode!!!");
    console.log(this.categories[el]);
  }
  
  functionName(el, ind, col) {

  }
  onAddCategory() {
    console.log("Indirizzamento verso componente add-category!!!");
    this.router.navigate(['/newcategory']);
  }
}
