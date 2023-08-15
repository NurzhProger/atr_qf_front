import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { organizationelementComponent } from './organization-element';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { orguser } from '../../interfaces';

@Component({
    selector: 'org-list',
    templateUrl: './organization-list.html'
})

export class orglistComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceChild: ConfirmationService,
        public dialogServiceReqList: DialogService,
        private messageServicedelOrgList: MessageService,
        public OrgListref: DynamicDialogRef) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    orgView: orguser;
    searchorg: string = '';
    searchbin: string = '';
    request: any = [];
    pageEvent = 1;
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

        this.getorglist(this.pageEvent, '')
    }

    getorglist(page: number, searchorg: string) {

        this.loading = false
        return this.httpservice
            .getorglist(page, searchorg)
            .pipe(
                timeout(13000),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        this.messageServicedelOrgList.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
                    }
                    else {
                        this.messageServicedelOrgList.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
                    }
                    return throwError('Произошла ошибка: ' + error.message);
                })

            )
            .subscribe(
                (data) => (this.request = data, this.paginatorInit(data), this.loading = true))

    }

    reset() {
        this.pageEvent = 1
        this.getorglist(this.pageEvent, this.searchorg)
    }

    search() {
        this.pageEvent = 1
        this.getorglist(this.pageEvent, this.searchorg)
    }

    onRowEdit(org_id: string) {
        this.OrgListref = this.dialogServiceReqList.open(organizationelementComponent,
            {
                header: 'Редактирование организации',
                width: 'calc(80%)',
                height: 'calc(100%)',
                data: { id: org_id }
            });

        this.OrgListref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.getorglist(this.pageEvent, this.searchorg)
            }
        })
    }

    paginatorInit(result: any) {
        for (let index = 0; index < (result.pagecount / 25); index++) {
            this.pages.push(index + 1);
        }
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1
        this.getorglist(this.pageEvent, this.searchorg)
    }

    closeform() {
        this.closeEvent.emit();
    }
}