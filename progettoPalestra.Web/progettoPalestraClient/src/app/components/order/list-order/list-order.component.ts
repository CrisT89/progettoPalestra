import {  ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StatusEnum, TestataOrdineDTO } from '../../../models/Data/testata-ordine.model';
import { OrderService } from '../../../services/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailsOrderComponent } from '../details-order/details-order.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrderService,
              private dialog: MatDialog) { }

  orders;
  columns = [];
  displayedColumns: string[] = ["ID", "Surname", "Name", "OrderDate", "Status"];
  statusEnum = StatusEnum;

  dialogCheckoutRef: MatDialogRef<DetailsOrderComponent>;
  subscription: Subscription;
  
  
  @ViewChild("orderListPag", {static: true}) paginator: MatPaginator;

  
  

  ngOnInit(): void {
   this.loadOrders();
    this.subscription = this.orderService.orderListChanged.subscribe(() => this.loadOrders());
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(res => 
      {
        this.orders = new MatTableDataSource(res);
        this.orders.paginator = this.paginator;
      }
    );
  }

  onClickRow(id: number) {
    // console.log(id);
    this.dialogCheckoutRef = this.dialog.open(DetailsOrderComponent, {
      data: {ID: id},
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      minWidth: '75%',
      minHeight: '150px'
    })
    
  }

  getColor(orderStatus: number) {
    switch (orderStatus) {
      case 1:
        return "red";
        break;
      case 2:
        return "orange";
        break;
      case 3:
        return "#00bd00";
        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // configurePaginator() {
  //   this.paginator._intl.itemsPerPageLabel = "CIAO";
  // }

  

  // configureColumns() {
  //   this.columns = [
  //     {
  //       columnDef: 'ID',
  //       header: 'No.',
  //       cell: (order: TestataOrdineDTO) => order.ID,
  //     },
  //     {
  //       columnDef: 'Surname',
  //       header: 'Cognome',
  //       cell: (order: TestataOrdineDTO) => order.Surname,
  //     },
  //     {
  //       columnDef: 'Name',
  //       header: 'Nome',
  //       cell: (order: TestataOrdineDTO) => order.Name,
  //     },
  //     {
  //       columnDef: 'OrderDate',
  //       header: 'Data Ordine',
  //       cell: (order: TestataOrdineDTO) => {
  //        let date: Date = new Date(order.OrderDate);
  //        return date.toLocaleDateString();
  //       },
  //     },
  //     {
  //       columnDef: 'Status',
  //       header: 'Status',
  //       cell: (order: TestataOrdineDTO) => StatusEnum[order.Status]  ,
  //     },
  //   ];
  // }

}
