import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { requestelementComponent } from 'src/app/dirs/request/requestelement.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { requestListView } from '../../interfaces';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'request-list',
    templateUrl: './requestlist.component.html'
})


export class requestlistComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceChild: ConfirmationService,
        public dialogServiceReqList: DialogService,
        private messageServicedelChildList: MessageService,
        public ReqListref: DynamicDialogRef) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    requestListView!: requestListView;
    searchrequest: string = '';
    request: any = [];
    pageEvent: number = 1;

    ngOnInit() {
        this.getrequestlist(1, this.searchrequest)
    }

    getrequestlist(page: number, search: string) {
        return this.httpservice
            .getrequestlist(page, search)
            .subscribe(
                (data) => (this.request = data));
    }

    reset() {
        this.getrequestlist(1, '')
    }

    getValue(value: number): string {
        if (value == 0) {
            return 'Новая заявка';
        }
        else if (value == 1) {
            return 'Одобрено'
        }
        else {
            return 'Отказано'
        }
    }

    onRowEdit(request: requestListView) {
        this.ReqListref = this.dialogServiceReqList.open(requestelementComponent,
            {
                header: 'Заявка на регистрацию',
                width: 'calc(80%)',
                height: 'calc(100%)',
                data: { id: request.id }
            });

        this.ReqListref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.getrequestlist(1, this.searchrequest)
            }
        });
    }

    search() {
        this.getrequestlist(1, this.searchrequest)
    }

    paginatorInit(result: any) {
        for (let index = 0; index < result.pagecount; index++) {
            this.pages.push(index + 1);
        }
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;

        return this.httpservice
            .getrequestlist(this.pageEvent, this.searchrequest)
            .subscribe(
                (data) => (this.request = data, this.paginatorInit(data)),
                (error) => (alert(error.message)));
    }

    closeform() {
        this.closeEvent.emit();
    }

}