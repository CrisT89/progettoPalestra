import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StatusEnum, TestataOrdineDTO } from '../../../models/Data/testata-ordine.model';
import { OrderService } from '../../../services/order.service';


@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {ID: number},
              private orderService: OrderService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DetailsOrderComponent>) { }

  order: TestataOrdineDTO = new TestataOrdineDTO();
  datiSpedizione: string = "";
  statusEnum = StatusEnum;
  statusKeys = Object.values(StatusEnum).filter(Number);
  statusValue: number;
  displayedColumns: string[] = ['Name', 'quantity','totalPrice'];
  statusForm: FormGroup;
  closeMatDialog = false;

  ngOnInit(): void {
    this.orderService.getById(this.data.ID)
      .subscribe(res => 
        {
          this.statusValue = res.Status;
          this.order = res;
          this.datiSpedizione = this.datiSpedizione.concat(res.Adress, ", ", res.City, " (", 
              res.Province, "), ", res.Cap.toString(), " - ", res.State);
        });
    this.createForm();
  }

  createForm() {
    this.statusForm = this.formBuilder.group({
    Status: [
      this.statusValue, []
    ],
    });
  }
  
  onSubmit() {
    if (this.statusValue != this.order.Status)
    {
      this.orderService.updateStatus(this.order.ID, this.statusValue).subscribe();
      this.dialogRef.close();
      
    }
    else {
      
      this.dialogRef.close();
    }
    
  }

  // onSubmit(f: NgForm) {
  //   console.log("ciao");
    
  //   console.log(f);
  // }

}
