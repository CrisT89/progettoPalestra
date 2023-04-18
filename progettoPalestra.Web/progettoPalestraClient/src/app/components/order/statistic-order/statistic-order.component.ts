import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ArticleStatisticDTO } from '../../../models/Data/article-statistic';
import { CategoryDTO } from '../../../models/Data/category.model';

@Component({
  selector: 'app-statistic-order',
  templateUrl: './statistic-order.component.html',
  styleUrls: ['./statistic-order.component.css']
})
export class StatisticOrderComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  statisticDataList: ArticleStatisticDTO[];
  displayedColumns: string[] = ["ID", "Nome", "TotalImport", "Acquistati", "FirstOrder", "DaysFromLast"];

  category: CategoryDTO;
  fromDate: Date = null;
  untilDate: Date = null;
  queryString = "";

  ngOnInit(): void {
    this.orderService.getStatistic(this.queryString).subscribe(res => this.statisticDataList = res);
  }

  onSubmit() {
    
    // console.log(query);
    // this.orderService.getStatistic(query).subscribe(res => this.statisticDataList = res);
  }

  onFromDateClear() {
    if (this.fromDate) {
      this.fromDate = null;
      this.update();
    }
  }

  onUntilDateClear() {
    if (this.untilDate){
      this.untilDate = null;
      this.update();

    }
  }

  createQueryString() {
    let query = "";
    let fk_Cat: number;
    let from: string;
    let until: string;
    if (this.category) {
     fk_Cat = this.category.ID;
     if (query != "") {
     query +=  "&&FK_Cat=" + fk_Cat; 
     }
     else {
      query +=  "?FK_Cat=" + fk_Cat;
     }
    }
    if (this.fromDate) {
     from = this.fromDate.toLocaleDateString();
     if (query != "") {
     query +=  "&&fromDate=" + from; 
     }
     else {
      query +=  "?fromDate=" + from;
     }
    }
    if (this.untilDate) {
     until = this.untilDate.toLocaleDateString();
     if (query != "") {
     query +=  "&&untilDate=" + until; 
     }
     else {
      query +=  "?untilDate=" + until;
     }
    }
    return query;
  }

  update() {
    let query = this.createQueryString();
    this.orderService.getStatistic(query).subscribe(res => this.statisticDataList = res);

  }

  log(event) {
    console.log(event);
    
  }

}
