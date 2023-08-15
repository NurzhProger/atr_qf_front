import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { HttpService } from 'src/app/http.service';
import { PriceserviceDetailComponent } from '../priceservice-detail/priceservice-detail.component';

@Component({
  selector: 'app-priceservice',
  templateUrl: './priceservice.component.html',
  styleUrls: ['./priceservice.component.css']
})
export class PriceserviceComponent implements OnInit {

  constructor(private httpservice: HttpService,
    private msgPrice: MessageService,
    private refPrice: DynamicDialogRef,
    private dserPrice: DialogService,) { }

  @Output() closeEvent = new EventEmitter<any>();

  loading = false;
  tableData: any[] = [];
  request: any = [];

  ngOnInit(): void {
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
    this.reset()
  }

  reset() {
    this.loading = false
    return this.httpservice
      .getpriceservice()
      .pipe(
        timeout(13000),
        catchError(error => {
          if (error.name === 'TimeoutError') {
            this.msgPrice.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
          }
          else {
            this.msgPrice.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
          }
          return throwError('Произошла ошибка: ' + error.message);
        })
      )
      .subscribe(
        (data) => (this.request = data, this.loading = true));
  }

  onRowEdit(id_obl: number, name_obl: string) {
    this.refPrice = this.dserPrice.open(PriceserviceDetailComponent,
      {
        header: 'Редактирование цены',
        width: 'calc(60%)',
        height: 'calc(60%)',
        data: { id_obl: id_obl, name_obl: name_obl }
      })
  }

  closeform() {
    this.closeEvent.emit();
  }

}
