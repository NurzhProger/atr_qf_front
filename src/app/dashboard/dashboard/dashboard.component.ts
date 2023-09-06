import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { orglistComponent } from 'src/app/adminpanel/organization/organization-list';
import { HttpService } from 'src/app/http.service';
import { DiagramComponent } from '../diagram/diagram.component';
import { SpaceSeparatorPipe } from '../../main/maincomponent/main.component';
import { orgselectComponent } from 'src/app/adminpanel/organization/organization-select';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(
    private httpservice: HttpService,
    private router: Router,
    private orgSelectref: DynamicDialogRef,
    private msgdash: MessageService,
    private refdash: DynamicDialogRef,
    private dsdash: DialogService
  ) {

  }
  @Output() closeEvent = new EventEmitter<any>();
  stateOptions: any[] = [{ label: 'Сумма (тыс. тенге)', value: 'summa' }, { label: 'Количество', value: 'count' }];
  value = 'count';
  DateStart = new Date;

  report: TreeNode[];
  report2: any = [];

  loading = true;
  count = false

  id_obl = 0
  id_region = 0
  response: any
  showClearObl = false
  showClearRegion = false
  user_org_id = ''; // id организации пользователя
  user_org_name = '';
  oblasttypes: any = []
  regiontypes: any = []

  tableData: any[] = [];

  ngOnInit() {
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

    this.id_region = 0
    this.user_org_id = ''
    this.getoblast()
  }

  form() {
    this.loading = false
    if (this.value == 'count') {
      this.formcount()
    }
    else {
      this.formsumma()
    }
  }

  formcount() {
    if (this.id_obl == null) {
      this.id_obl = 0
    }
    if (this.id_region == null) {
      this.id_region = 0
    }
    this.httpservice
      .formfordash(this.id_obl, this.id_region, this.user_org_id)
      .subscribe((data) => (this.report = data, this.loading = true))
  }

  formsumma() {
    this.httpservice.formfordashsumm().subscribe((data) => (this.report = data, this.loading = true))
  }

  changetype() {
    this.report = []
  }

  getColorClass(sub: number): string {
    if (sub == 1) {
      return 'blue-class'
    }
    else if (sub == 2) {
      return 'arctic-class'
    }
    else if (sub == 3) {
      return 'gray-class'
    }
    else if (sub == 4) {
      return 'green-class'
    }
    else {
      return 'yellow-class'
    }

  }

  showDetail(obl: any) {

    this.refdash = this.dsdash.open(DiagramComponent,
      {
        width: 'calc(80%)',
        height: 'calc(100%)',
        data: { 'plan': obl }
      });

  }

  closeform() {
    this.closeEvent.emit();
  }

  getoblast() {
    this.id_obl = 0
    this.httpservice
      .getoblasttype()
      .subscribe(
        (data) => (
          this.oblasttypes = data
        ),
        (error) => (
          this.msgdash.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' }))
      );
    // }
  }

  clearObl() {
    this.id_obl = 0
    this.changeobl()
  }

  changeobl() {
    this.regiontypes.splice(0)
    this.showClearObl = this.id_obl !== 0
    this.clearRegion()
  }

  clearRegion() {
    this.id_region = 0
    this.changeregion()
  }

  changeregion() {
    this.showClearRegion = this.id_region !== 0
    this.clearOrg()
  }

  getregion() {
    if (this.regiontypes.length == 0) {
      this.httpservice
        .getregiontype()
        .subscribe(
          (data) => (
            this.regiontypes = data
          ),
          (error) => (this.msgdash.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
    }
  }

  openOrg() {
    this.orgSelectref = this.dsdash.open(orgselectComponent,
      {
        header: 'Выбор организации',
        width: 'calc(60%)',
        height: 'calc(80%)',
        data: { suborg: true }
      })

    this.orgSelectref.onClose.subscribe((org: any) => {
      if (org) {
        this.user_org_id = org.id_org,
          this.user_org_name = org.org_name
      }
    })
  }

  clearOrg() {
    this.user_org_id = '',
      this.user_org_name = ''
  }

  changedate(date: Date) {
    // let firstDayOfMonthDate = this.toLocaleDate(new Date(date.getFullYear(), date.getMonth(), 1));
    // let firstDay = this.toLocaleDate(new Date(this.today.getFullYear(), this.today.getMonth(), 1));

    // if (firstDay != firstDayOfMonthDate) {
    //   this.thismonth = false
    // }
    // else {
    //   this.thismonth = true
    // }

    // this.report = '';
    // this.days = Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }, (_, i) => i + 1);
  }

}


