import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDTO } from '../../../models/Data/category.model';
import { CategoryService } from '../../../services/DataService/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { }

  categoryForm: FormGroup;
  category: CategoryDTO = new CategoryDTO();
  idParam: number;

  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id'];
    if (this.idParam) {
      this.categoryService.getById(this.idParam)
        .subscribe(data => {
          this.category = data;
          this.createForm()
        });
    }
    else {
      this.createForm();
    }
  }

  createForm() {
    this.categoryForm = this.formBuilder.group({
      'Nome': [this.category.Name, [Validators.required, Validators.maxLength(100)]],
      'Label': [this.category.Label, [Validators.maxLength(40)]],
      'Descrizione': [this.category.Description, []],
    });
  }

  saveCategory() {
    const values: Object = this.categoryForm.value;
    /*bind the inserted values and then save them*/
    console.log(values, "save!");
    this.category.Name = values['Nome'];
    this.category.Label = values['Label'];
    this.category.Description = values['Descrizione'];
    this.categoryService.saveCategory(this.category).subscribe(result => { });
    this.onNavigateBack();
  }

  modifyCategory() {
    const values: Object = this.categoryForm.value;
    /*bind the inserted values and then save them*/
    console.log(values, "save!");
    this.category.Name = values['Nome'];
    this.category.Label = values['Label'];
    this.category.Description = values['Descrizione'];
    this.categoryService.modifyCategory(this.idParam, this.category).subscribe(result => { });
    this.onNavigateBack();
  }

  onNavigateBack() {
    this.router.navigate(['/categories']);
  }

  suConsole() {
    // var cat: CategoryDTO;
    // this.categoryService.getInc(this.idParam).subscribe(res => console.log(res));
    // console.log(cat);
  }
}
