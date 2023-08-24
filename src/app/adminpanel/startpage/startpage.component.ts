import { Component, EventEmitter, Output, Input } from "@angular/core";
import { HttpService } from '../../http.service';
import { MessageService } from "primeng/api";

declare var myLocalStorage: any; //Локальное хранилище


@Component({
  selector: 'startpage-admin',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})


export class StartPageAdminComponent {
  constructor(private httpservice: HttpService,
    public messageServiceStart: MessageService) { }

  @Output() newItemEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();
  @Input() params_doc_book: any;

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


}
