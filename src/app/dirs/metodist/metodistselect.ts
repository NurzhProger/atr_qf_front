import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { metodistelementComponent } from 'src/app/dirs/metodist/metodistelement';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { metodistView } from '..//../interfaces';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'metodist-select',
    templateUrl: './metodistselect.html',
    styleUrls: ['./metodist.css']
})


export class metodistselectComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceMetodist: ConfirmationService,
        public dialogServiceMetodistList: DialogService,
        public MetodistListref: DynamicDialogRef,
        public MetodistSelectref: DynamicDialogRef,
        private messageServicedelMetodSelect: MessageService) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    metodistViewList!: metodistView;
    searchmetodist: string = '';
    metodist: any = [];
    selectedMetodist: any;
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
        ]
        this.getmetodistlist()
    }

    getmetodistlist() {
        return this.httpservice
            .getmetodistlist(this.pageEvent, this.searchmetodist)
            .subscribe(
                (data) => (this.metodist = data, this.loading = true));
    }

    onRowEdit(metodist: metodistView) {
        this.metodistViewList = metodist;

        this.MetodistListref = this.dialogServiceMetodistList.open(metodistelementComponent,
            {
                header: 'Изменение пароля воспитателя',
                width: 'calc(50%)',
                height: 'calc(70%)',
                data: { data: this.metodistViewList, type: 'changepass' }
            });

        this.MetodistListref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.getmetodistlist()
            }
        });
    }

    selectMetodist() {

        if (!this.selectedMetodist) {
            this.messageServicedelMetodSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите методиста!' })
            return
        }

        this.MetodistSelectref.close(this.selectedMetodist);
    }

    close() {
        this.MetodistSelectref.close();
    }

    onRowSelect(event: any) {
        this.MetodistSelectref.close(event);
    }

    openNew() {
        this.metodistViewList = {
            id_org: '',
            username: '',
            password: '',
            first_name: '',
            email: ''
        }
        this.MetodistListref = this.dialogServiceMetodistList.open(metodistelementComponent,
            {
                header: 'Создание воспитателя',
                width: 'calc(50%)',
                height: 'calc(70%)',
                data: { data: this.metodistViewList, type: 'add' }
            });
        this.MetodistListref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.getmetodistlist()
            }
        });
    }

    deleteMetodist(metodistView: metodistView) {
        this.confirmationServiceMetodist.confirm({
            message: 'Вы действительно хотите удалить ' + metodistView.first_name + '?',
            header: 'Удаление воспитателя',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.httpservice
                    .metodist_edit('del', { "username": metodistView.username })
                    .subscribe((data) => (this.getmetodistlist(),
                        this.messageServicedelMetodSelect.add({ severity: 'success', summary: 'Успешно', detail: 'Методист удален!' }),
                        this.confirmationServiceMetodist.close()),
                        (error) => (this.messageServicedelMetodSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
                            this.confirmationServiceMetodist.close())
                    )
            },
            reject: () => {
                this.confirmationServiceMetodist.close();
            }
        });
    }

    search() {
        this.getmetodistlist()
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        this.getmetodistlist()
    }

    closeform() {
        this.closeEvent.emit();
    }

}