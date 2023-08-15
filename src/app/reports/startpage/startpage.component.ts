import { Component, EventEmitter, Output, Input, ViewChild } from "@angular/core";
import { HttpService } from '../../http.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MessageService } from "primeng/api";

declare var myLocalStorage: any; //Локальное хранилище


@Component({
  selector: 'startpage-element',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})


export class firstpagelementComponent {
  constructor(private httpservice: HttpService,
    public messageServiceStart: MessageService) { }

  @Output() newItemEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();
  @Input() params_doc_book: any;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  public ChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public ChartType: ChartType = 'pie';
  public ChartPlugins = [];


  public Data: ChartData<'pie'> = {
    labels: [],
    datasets: []
  };

  response: any;
  labels: any = [];
  qtyarray: any = [];
  latitude: number = 0;
  longitude: number = 0;

  ngOnInit() {
    this.response = [{
      quantityofchild: 0,
      quantityofgroup: 0,
      quantityofmetodist: 0,
      fullname: '',
      org_name: '',
      bin: '',
      phonenumber: '',
      adress: '',
      email: '',
      latitude: 0,
      longitude: 0
    }];

    return this.httpservice
      .startpage()
      .subscribe(
        (data) => (
          this.response = data,
          this.latitude = Number(this.response[0].latitude),
          this.longitude = Number(this.response[0].longitude)),
        (error) => (this.messageServiceStart.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
  }

  obrabotkaPie(arr: any) {
    arr.forEach((element: { year_of_publication: string; }) => {
      this.labels.push(element.year_of_publication)
    });

    arr.forEach((element: { book_qty: string; }) => {
      this.qtyarray.push(element.book_qty)
    });

    this.Data.labels = this.labels;
    this.Data.datasets.push({ data: this.qtyarray });
    this.chart?.update();

  }

  // initMap(): void {
  //   var geolocation = ymaps.geolocation,
  //     map = new ymaps.Map('map', {
  //       center: [44.841170, 65.505546],
  //       zoom: 13
  //     });

  // }

  openDialog(type: string) { }



  closeform() {
    this.closeEvent.emit();
  }


}
