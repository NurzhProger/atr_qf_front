import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { organizationelementComponent } from '../organization/organization-element';
import { SubOrgDetail } from './suborg';
import { orguser } from '../../interfaces';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Component({
    selector: 'sub-list',
    templateUrl: './sub-list.html'
})

export class SublistComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceChild: ConfirmationService,
        public dialogServiceReqList: DialogService,
        private messageServicedelChildList: MessageService,
        public OrgListref: DynamicDialogRef) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    orgView: orguser;
    searchorg: string = '';
    request: any = [];
    pageEvent: number = 1;
    loading = false;
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
        ];
        this.reset()
    }

    getorglist() {
        this.loading = false
        return this.httpservice
            .getorglist(this.pageEvent, this.searchorg)
            .pipe(
                timeout(13000),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        this.messageServicedelChildList.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
                    }
                    else {
                        this.messageServicedelChildList.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
                    }
                    return throwError('Произошла ошибка: ' + error.message);
                })

            )
            .subscribe(
                (data) => (this.request = data, this.paginatorInit(data), this.loading = true));
    }

    reset() {
        this.getorglist()
    }

    onRowEdit(org_id: string, org_name: string) {
        this.OrgListref = this.dialogServiceReqList.open(SubOrgDetail,
            {
                header: 'Иерархия организации',
                width: 'calc(80%)',
                height: 'calc(100%)',
                data: { org_id: org_id, org_name: org_name }
            })
    }

    paginatorInit(result: any) {
        for (let index = 0; index < result.pagecount; index++) {
            this.pages.push(index + 1);
        }
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        this.getorglist()
    }

    closeform() {
        this.closeEvent.emit();
    }
}