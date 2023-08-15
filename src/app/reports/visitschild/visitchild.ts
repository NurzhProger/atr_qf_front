import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../http.service';
import { groupView } from '../../interfaces';
import { groupselectComponent } from 'src/app/dirs/group/groupselect';
import * as save from 'file-saver';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { childelementComponent } from 'src/app/dirs/child/childelement';
import { orgselectComponent } from 'src/app/adminpanel/organization/organization-select';
import { childListView } from '..//../interfaces';
import { MessageService } from 'primeng/api';
declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'visitchild-element',
    templateUrl: './visitchild.html',
    styleUrls: ['./visitchild.css']
})

export class visitchildComponent {
    constructor(private httpservice: HttpService,
        public groupSelectref: DynamicDialogRef,
        public childVisitref: DynamicDialogRef,
        public dialogServicechildVisit: DialogService,
        public groupSelectdialogService: DialogService,
        public messageServiceVisit: MessageService) { }
    @Output() closeEvent = new EventEmitter<any>();
    report: any = [];
    today: Date = new Date;
    period: Date = new Date;
    res: any;

    user_org_id = ''; // id организации пользователя
    user_org_name = ''; // наим орг пользователя

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

    ngOnInit() {
        this.getinfoorg()
    }

    getinfoorg() {
        return this.httpservice
            .getinfoorg()
            .subscribe(
                (data) => (this.res = data,
                    this.user_org_id = this.res.user_org_id,
                    this.user_org_name = this.res.user_org_name),
                (error) => (this.messageServiceVisit.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
    }

    clearGroup() {
        this.report = '',
            this.groupView.group_name = '';
        this.groupView.id_group = '';
    }

    openChild(child: childListView) {
        this.childVisitref = this.dialogServicechildVisit.open(childelementComponent,
            {
                header: 'Фотографии ребенка',
                width: 'calc(45%)',
                height: 'calc(60%)',
                data: { child: child, today: this.toLocaleDate(this.period), type: 'visitchild' }
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

    toLocaleDate(dateForStr: Date) {

        return new Date(dateForStr).toLocaleDateString();

    }

    form() {

        if (this.period == undefined) {
            this.messageServiceVisit.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите период!' })
            return
        }

        return this.httpservice
            .getchildstatus('', this.user_org_id, this.groupView.id_group, this.toLocaleDate(this.period), "")
            .subscribe(
                (data) => (this.report = data),
                (error) => (this.messageServiceVisit.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
    }

    getColorClass(status: string): string {
        if (status == '2') {
            return 'green-class';
        }
        else if (status == '3') {
            return 'arctic-class';
        }
        else if (status == '4') {
            return 'yellow-class';
        }
        else if (status == '5' || status == '1') {
            return 'gray-class';
        }
        else if (status == '9' || status == '10') {
            return 'red-class';
        }
        else {
            return 'pink-class';
        }
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.report);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array"
            });
            this.saveAsExcelFile(excelBuffer, "Отметки детей");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        import("file-saver").then(FileSaver => {
            let EXCEL_TYPE =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            let EXCEL_EXTENSION = ".xlsx";
            const data: Blob = new Blob([buffer], {
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