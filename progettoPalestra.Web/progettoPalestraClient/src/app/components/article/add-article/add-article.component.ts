import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAttachmentDTO } from '@eqproject/eqp-attachments';
import { ArticleDTO } from '../../../models/Data/article.model';
import { ArticleService } from '../../../services/DataService/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  articleForm: FormGroup;
  defaultIVA: number = 10;
  article: ArticleDTO = new ArticleDTO(this.defaultIVA);
  idParam: number;
  image: Array<IAttachmentDTO>;

  imgPath: string;


  ngOnInit(): void {
    this.idParam = this.route.snapshot.params['id'];
    if (this.idParam) {
      this.articleService.getById(this.idParam).subscribe(
        data => {
          this.article = data;
          this.createForm();
        }
      );
    }
    else {
      this.createForm();
    }
  }

  selectedTabCounter: number = 0;
  maxNumberOfTabs: number = 1;

  createForm() {
    this.articleForm = this.formBuilder.group({
      Nome: [
        this.article.Name, [Validators.required]
      ],
      Prezzo: [
        this.article.Price,
        [Validators.required,],
      ],
      Codice: [
        this.article.Code,
        [Validators.required,],
      ],
      Descrizione: [
        this.article.Description,
        [Validators.required,],
      ],
      ImagePath: [
        this.article.ImagePath, []
      ],
      Iva: [
        this.article.Iva, [Validators.min(0), Validators.max(100)]
      ],
      PrezzoScontato: [
        this.article.DiscountPrice, [Validators.min(0), Validators.max(this.article.Price)]
      ],
      DataScadenza: [
        this.article.EndOfValidity, []
      ],
      Sospeso: [
        this.article.Suspended, []
      ],
      InEvidenza: [
        this.article.InEvidence, []
      ],
      Categoria: [
        this.article.Category, [Validators.required]
      ],
    });
  }

  saveFunctionName(exit: boolean = true) {
    const values: Object = this.articleForm.value;
    /*bind the inserted values*/
    this.article.Name = values['Nome'];
    this.article.Price = values['Prezzo'];
    this.article.Code = values['Codice'];
    this.article.Description = values['Descrizione'];
    this.article.ImagePath = values['ImagePath'];
    this.article.FK_Category = values['Categoria']['ID'];
    this.article.Iva = values['Iva'];
    this.article.DiscountPrice = values['PrezzoScontato'];
    this.article.EndOfValidity = values['DataScadenza'];
    this.article.Suspended = values['Sospeso'];
    this.article.InEvidence = values['InEvidenza'];
    if (exit) {
      if (this.idParam) {
        this.articleService.modifyArticle(this.idParam, this.article).subscribe();
      }
      else {
        this.articleService.saveArticle(this.article).subscribe();
      }
      this.exitFunctionName()
    } else {
      if (this.idParam) {
        this.articleService.modifyArticle(this.idParam, this.article).subscribe();
      }
      else {
        this.articleService.saveArticle(this.article).subscribe();
      }
    }

    console.log(values, "save!");
  }

  exitFunctionName() {
    this.router.navigate(['/articles']);
  }

  viewAttachmentFunctionName($event) {

  }

  onDeleteAttachmentFunctionName($event) {

  }

  catchAttachmentListFunctionName(event: Event) {
    if (event[0]['AttachmentType']==2)
    {
      this.article.ImagePath = event[0]['FilePath'];
    }
    console.log(event);
  }

  onFileChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgPath = reader.result as string;
    }
    console.log(event.target.value);
  }

  onUpdate(event) {
    console.log(event.target.value);
    this.imgPath = event.target.value;
  }
}
