import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpService } from '../../http.service';
import { childstatus } from '../../interfaces';
import { childelementComponent } from 'src/app/dirs/child/childelement';
import { groupselectComponent } from 'src/app/dirs/group/groupselect';
import * as save from 'file-saver';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { childListView, groupView } from '..//../interfaces';
import { orgselectComponent } from 'src/app/adminpanel/organization/organization-select';
import { MessageService } from 'primeng/api';

declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'plan-list',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.css']
})

export class planComponent {
    constructor(private httpservice: HttpService,
        public groupSelectref: DynamicDialogRef,
        public groupSelectdialogService: DialogService,
        public dialogServicechildPlan: DialogService,
        public childPlanref: DynamicDialogRef,
        public messageServicePlan: MessageService) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Input() user_org_id = ''
    @Input() user_org_name = ''
    @Input() is_staff = ''
    @Input() id_region = 0
    @Input() is_metodist = ''
    stateOptions: any[] = [{ label: 'По организации', value: 'org' }, { label: 'По регионам', value: 'reg' }]
    value = 'org'

    report: any = []
    reportOrg: any = []
    reportOrg_all: any = []
    countallstatus: any = []
    count: any

    statuses: any = [];
    res: any;
    period: Date = new Date;
    id_group = ''; // id организации пользователя
    group_name = ''; // наим орг пользователя
    loading = true;
    tableData: any[] = [];
    showClearRegion = false
    regiontypes: any = []
    id_obl = 1

    changetype() {
        // this.report = []
        // this.countallstatus = []
    }

    clearRegion() {
        this.id_region = 0
        this.changeregion()
    }

    changeregion() {
        this.showClearRegion = this.id_region !== 0
        this.reset()
    }

    getregion() {
        if (this.regiontypes.length == 0) {
            this.httpservice
                .getregiontype(this.id_obl.toString())
                .subscribe(
                    (data) => (
                        this.regiontypes = data
                    ),
                    (error) => (this.messageServicePlan.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }


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

        if (this.is_staff == 'True') {
            this.id_region = 0
        }
    }

    getinfoorg() {
        return this.httpservice
            .getinfoorg()
            .subscribe(
                (data) => (this.res = data,
                    this.is_staff = this.res.is_staff,
                    this.is_metodist = this.res.is_metodist,
                    this.user_org_id = this.res.user_org_id,
                    this.user_org_name = this.res.user_org_name,
                    this.id_region = this.res.user_id_region
                ),
                (error) => (this.messageServicePlan.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
    }

    clearcount() {
        this.countallstatus = {
            common: 0,
            notreg: 0,
            notvis: 0,
            notscanned: 0,
            otp: 0,
            vis: 0,
            boln: 0,
            check: 0,
            fake: 0
        }
    }

    reset() {
        this.clearcount()

        this.httpservice
            .getchildallstatus(this.user_org_id, this.id_group, this.toLocaleDate(this.period))
            .subscribe(
                (data) => (this.count = data, this.countallstatus = this.count[0]),
                (error) => (this.messageServicePlan.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));

    }

    toLocaleDate(dateForStr: Date) {
        return new Date(dateForStr).toLocaleDateString();
    }

    formReport() {
        if (this.value == 'org') {
            this.form('')
        }
        else {
            this.formRegion()
        }
    }

    calculateAllChild(id_region: number) {
        let total = 0;

        if (this.report) {
            for (let customer of this.report) {

                if (customer.id_region === id_region) {
                    total = total + customer.all_childs;
                }
            }
        }
        return total
    }

    calculateStatus2(id_region: number) {
        let total = 0;

        if (this.report) {
            for (let customer of this.report) {
                if (customer.id_region === id_region) {
                    total = total + customer.status_2;
                }
            }
        }

        return total

    }

    calculateStatus3(id_region: number) {
        let total = 0;

        if (this.report) {
            for (let customer of this.report) {
                if (customer.id_region === id_region) {
                    total = total + customer.status_3;
                }
            }
        }
        return total
    }

    calculateNotVis(id_region: number) {
        let total = 0;

        if (this.report) {
            for (let customer of this.report) {

                if (customer.id_region === id_region) {
                    total = total + customer.not_vis;
                }
            }
        }
        return total
    }

    calculateStatus4(id_region: number) {
        let total = 0;

        if (this.report) {
            for (let customer of this.report) {
                if (customer.id_region === id_region) {
                    total = total + customer.status_4;
                }
            }
        }

        return total

    }

    calculateStatus10(id_region: number) {
        let total = 0;

        if (this.report) {
            for (let customer of this.report) {
                if (customer.id_region === id_region) {
                    total = total + customer.status_10;
                }
            }
        }
        return total
    }

    formRegion() {
        if (this.period == undefined) {
            this.messageServicePlan.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите период!' })
            return
        }

        this.loading = false

        return this.httpservice
            .getStatusRegion(this.id_region, this.toLocaleDate(this.period))
            .subscribe(
                (data) => (this.report = data, this.loading = true),
                (error) => (this.messageServicePlan.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
    }

    formbyOrg(detail: any) {
        this.user_org_id = detail.id_org
        this.user_org_name = detail.org_name;
        this.value = 'org'
        this.formReport()
    }

    all_vis(status: string) {
        if (status == '') {
            this.reportOrg = this.reportOrg_all
        }
        else {
            this.reportOrg = this.reportOrg_all.filter((item: { [x: string]: string; }) => item['status'] == status)
        }
    }

    form(status: string) {
        if (this.period == undefined) {
            this.messageServicePlan.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите период!' })
            return
        }

        this.loading = false

        return this.httpservice
            .getchildstatus(status, this.user_org_id, this.id_group, this.toLocaleDate(this.period), "")
            .subscribe(
                (data) => (this.reportOrg_all = data, this.reportOrg = this.reportOrg_all, this.reset(), this.loading = true),
                (error) => (this.messageServicePlan.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
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
                    this.clearcount(),
                    this.user_org_id = org.id_org,
                    this.user_org_name = org.org_name
            }
        })
    };

    clearGroup() {
        this.reportOrg = '',
            this.group_name = '';
        this.id_group = '';
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
                this.clearcount(),
                    this.group_name = group.group_name,
                    this.id_group = group.id_group
            }
        })
    };

    openChild(child: childListView, status: string) {
        if (status == '11') {
            status = '10'
        }

        if (status == '10' || status == '2') {
            this.childPlanref = this.dialogServicechildPlan.open(childelementComponent,
                {
                    header: 'Фотографии ребенка',
                    width: 'calc(45%)',
                    height: 'calc(60%)',
                    data: { child: child, status: parseInt(status), id_org: this.user_org_id, today: this.toLocaleDate(this.period), type: 'openfromtabel' }
                })
        }


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
        else if (status == '1') {
            return 'gray-class';
        }
        else if (status == '5') {
            return 'light-red-class';
        }
        else if (status == '9' || status == '10') {
            return 'red-class';
        }
        else {
            return 'pink-class';
        }
    }

    getColorClassForNumber(status: number): string {
        if (status > 0) {
            return 'red-class';
        }
        else {
            return 'simple-class'
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
            this.saveAsExcelFile(excelBuffer, "Дневной план");
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