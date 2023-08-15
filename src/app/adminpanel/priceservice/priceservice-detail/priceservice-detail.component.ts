import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-priceservice-detail',
  templateUrl: './priceservice-detail.component.html',
  styleUrls: ['./priceservice-detail.component.css']
})
export class PriceserviceDetailComponent implements OnInit {

  constructor(private httpservice: HttpService,
    private dconfPrice: DynamicDialogConfig,
    private drefPrice: DynamicDialogRef,
    private msgPrice: MessageService,) { }
  id_obl = 0
  name_obl = ''
  result: any = []
  loading = false
  tableData: any[] = []

  ngOnInit(): void {
    this.id_obl = this.dconfPrice.data.id_obl
    this.name_obl = this.dconfPrice.data.name_obl

    this.tableData = [
      {
        id: ''
      },
      {
        id: ''
      },
      {
        id: ''
      },
      {
        id: ''
      },
      {
        id: ''
      },
    ]

    this.getpriceobl()

  }

  getpriceobl() {
    return this.httpservice
      .getpriceobl(this.id_obl)
      .subscribe(
        (data) => (this.result = data, this.loading = true))
  }

  saveprice() {
    let mass = { "id_obl": this.id_obl, "result": this.result }

    console.log(mass);

    return this.httpservice
      .setpriceobl(mass)
      .subscribe(
        (data) => (this.msgPrice.add({ severity: 'success', summary: 'Успешно', detail: 'Данные ребенка сохранены!' }),
          this.close()),
        (error) => (this.msgPrice.add({
          severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить данные. Попробуйте заново!'
        })))



  }

  close() {
    this.drefPrice.close();
  }
}
