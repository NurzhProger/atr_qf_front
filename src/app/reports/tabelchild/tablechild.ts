import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../http.service';
import { childView, groupView } from '../../interfaces';
import * as XLSX from 'xlsx';

import { orgselectComponent } from 'src/app/adminpanel/organization/organization-select';
import { groupselectComponent } from 'src/app/dirs/group/groupselect';
import * as save from 'file-saver';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { childelementComponent } from 'src/app/dirs/child/childelement';
import { childListView } from '../../interfaces';
import { MenuItem, MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var myLocalStorage: any; //Локальное хранилище
declare var sessionStorage: any;


@Component({
    selector: 'tablechild-element',
    templateUrl: './tablechild.html',
    styleUrls: ['./tablechild.css']
})

export class tablechildComponent {
    constructor(private httpservice: HttpService,
        private http: HttpClient,
        private groupSelectref: DynamicDialogRef,
        private childVisitref: DynamicDialogRef,
        private messageServiceChildTable: MessageService,
        private dialogServicechildVisit: DialogService,
        private groupSelectdialogService: DialogService) {

    }

    @Output() closeEvent = new EventEmitter<any>();
    @Input() user_org_id = ''
    @Input() user_org_name = ''
    @Input() is_staff = ''

    report: any = [];
    res: any;
    numberOfDays: number = 1;
    datenachalo: Date;
    datekonec: Date;
    today: Date = new Date;
    rangeDates: Date = new Date;
    dayforaccess = 0;
    selectedChild: childListView;
    selectedDay = '';
    thismonth = true;

    groupView: groupView = {
        id_org: '',
        id_group: '',
        group_name: '',
        group_age: '',
        group_count: '',
        first_name: '',
        last_name: '',
        username: '',
        category: ''
    };
    days: number[];
    cols: any[];
    loading = true;
    tableData: any[] = [];

    ngOnInit() {
        this.rangeDates = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
        this.dayforaccess = this.today.getDate();

        this.changedate(this.rangeDates);

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
        ];
    }


    hideOP(op: OverlayPanel) {
        op.hide();
    }

    onContextMenu(event: MouseEvent, child: any, day: number) {
        event.preventDefault()
        this.selectedChild = child
        this.selectedDay = this.toLocaleDate(new Date(this.today.getFullYear(), this.today.getMonth(), day))
    }

    editstatus(status: string, op: OverlayPanel) {
        op.hide();
        this.editvisit(status);
    }

    editvisit(status: string) {
        let mass = [{ 'id_org': this.user_org_id, 'id_group': this.selectedChild.id_group, 'iin': this.selectedChild.iin, 'datestatus': this.selectedDay, 'status': status }]
        this.httpservice
            .editvisit(mass)
            .subscribe(
                (data) => (this.selectedChild.iin = '', this.selectedDay = '', this.form()),
                (error) => (this.messageServiceChildTable.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось изменить данные ребенка!' })));
    }

    changedate(date: Date) {
        let firstDayOfMonthDate = this.toLocaleDate(new Date(date.getFullYear(), date.getMonth(), 1));
        let firstDay = this.toLocaleDate(new Date(this.today.getFullYear(), this.today.getMonth(), 1));

        if (firstDay != firstDayOfMonthDate) {
            this.thismonth = false
        }
        else {
            this.thismonth = true
        }

        this.report = '';
        this.days = Array.from({ length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }, (_, i) => i + 1);
    }

    openChild(child: childListView) {
        this.childVisitref = this.dialogServicechildVisit.open(childelementComponent,
            {
                header: 'Фотографии ребенка',
                width: 'calc(45%)',
                height: 'calc(60%)',
                data: { iin: child.iin, id_group: child.id_group, image_url: child.image_url, type: 'edit' }
            });
    }

    openChildDay(child: childListView, day: number, status: number) {

        if (status > 20) {
            status = status - 20
        }
        else {
            status = status - 10
        }

        let firstDayOfMonth = new Date(this.rangeDates.getFullYear(), this.rangeDates.getMonth(), 1);
        let nextmonth = firstDayOfMonth.setDate(firstDayOfMonth.getDate() + day)
        let today = new Date(this.rangeDates.getFullYear(), this.rangeDates.getMonth(), firstDayOfMonth.getDate());

        this.childVisitref = this.dialogServicechildVisit.open(childelementComponent,
            {
                header: 'Фотографии ребенка',
                width: 'calc(45%)',
                height: 'calc(60%)',
                data: { child: child, status: status, id_org: this.user_org_id, today: this.toLocaleDate(today), type: 'openfromtabel' }
            });
    }

    openChildFoto(child: childListView, image_url: string) {

        this.childVisitref = this.dialogServicechildVisit.open(childelementComponent,
            {
                header: 'Фотографии ребенка',
                width: 'calc(45%)',
                height: 'calc(60%)',
                data: { child: child, image_url: image_url, type: 'openfromplan' }
            });
    }

    openGroup() {
        this.groupSelectref = this.groupSelectdialogService.open(groupselectComponent,
            {
                header: 'Выбор группы',
                width: 'calc(60%)',
                height: 'calc(80%)',
                data: { org_id: this.user_org_id }
            });

        this.groupSelectref.onClose.subscribe((group: any) => {
            if (group) {
                this.groupView.group_name = group.group_name,
                    this.groupView.id_group = group.id_group
            }
        })
    };

    clearGroup() {
        this.report = '',
            this.groupView.group_name = '';
        this.groupView.id_group = '';
    }

    openOrg() {
        this.groupSelectref = this.groupSelectdialogService.open(orgselectComponent,
            {
                header: 'Выбор организации',
                width: 'calc(60%)',
                height: 'calc(80%)',
                data: { suborg: true }
            })

        this.groupSelectref.onClose.subscribe((org: any) => {
            if (org) {
                this.clearGroup(),
                    this.user_org_id = org.id_org,
                    this.user_org_name = org.org_name
            }
        })
    };

    clearOrg() {
        // this.user_org_id = '';
        // this.user_org_name = '';
    }

    toLocaleDate(dateForStr: Date) {

        return new Date(dateForStr).toLocaleDateString();

    }

    form() {

        this.loading = false;

        if (this.user_org_id == '') {
            this.messageServiceChildTable.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите организацию!' })
            return
        }

        let datenachalo = this.rangeDates;
        let datekonec = new Date(this.rangeDates.getFullYear(), this.rangeDates.getMonth() + 1, 0);

        return this.httpservice
            .getchildtable(this.toLocaleDate(datenachalo), this.toLocaleDate(datekonec), this.user_org_id, this.groupView.id_group)
            .subscribe(
                (data) => (this.report = data, this.loading = true),
                (error) => (this.messageServiceChildTable.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить табель!' })));

    }

    getValue(value: number): string {
        value = value - 10

        if (value == 2) {
            return '+'
        }
        else if (value == 7) {
            return 'В'
        }
        else if (value == 3 || value == 13) {
            return 'Б'
        }
        else if (value == 4 || value == 14) {
            return 'О'
        }
        else {
            return '-'
        }
    }

    getColorClass(status: number): string {

        if (status != 0) {
            status = status - 10
        }

        if (status == 2) {
            return 'green-class';
        }
        else if (status == 3) {
            return 'arctic-class'
        }
        else if (status == 13) {
            return 'edited-arctic-class'
        }
        else if (status == 4) {
            return 'yellow-class'
        }
        else if (status == 14) {
            return 'edited-yellow-class'
        }
        else if (status == 15) {
            return 'edited-gray-class'
        }
        else if (status == 7) {
            return 'blue-class';
        }
        else {
            return 'gray-class';
        }

        // else {
        //     return 'red-class';
        // }
    }

    exportExcel() {

        let datenachalo = this.rangeDates;
        let datekonec = new Date(this.rangeDates.getFullYear(), this.rangeDates.getMonth() + 1, 0);

        this.httpservice
            .gettablexls(this.toLocaleDate(datenachalo), this.toLocaleDate(datekonec), this.user_org_id, this.groupView.id_group)
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            let EXCEL_EXTENSION = ".xlsx";
            let data: Blob = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            save.saveAs(
                data,
                fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
            );
        });
    }

    closeform() {
        this.closeEvent.emit();
    }

}