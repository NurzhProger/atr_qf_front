import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { HttpService } from '../../http.service';
import { metodistelementComponent } from 'src/app/dirs/metodist/metodistelement';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { metodistView } from '..//../interfaces';
import { uploadComponent } from '../upload/upload.component';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'metodist-list',
    templateUrl: './metodistlist.html',
    styleUrls: ['./metodist.css']
})


export class metodistlistComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceMetodist: ConfirmationService,
        private dialogServiceMetodistList: DialogService,
        private MetodistListref: DynamicDialogRef,
        private messageServicedelMetodList: MessageService) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    metodistViewList!: metodistView;
    searchmetodist: string = '';
    metodist: any = [];
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
        this.loading = false

        return this.httpservice
            .getmetodistlist(this.pageEvent, this.searchmetodist)
            .subscribe(
                (data) => (this.metodist = data, this.loading = true));
    }

    reset() {
        this.getmetodistlist()
    }

    openUpload() {
        this.MetodistListref = this.dialogServiceMetodistList.open(uploadComponent,
            {
                header: 'Импорт воспитателей',
                width: '40%',
                height: '30%',
                data: { type: 'metodist' }
            });

        this.MetodistListref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.reset(),
                    this.messageServicedelMetodList.add({ severity: 'success', summary: 'Успешно', detail: 'Данные загружены!' })
            }
        });
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
                this.reset()
            }
        });
    }

    openNew() {

        this.metodistViewList = {
            id_org: '',
            org_name: '',
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
                this.reset()
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
                    .subscribe((data) => (this.messageServicedelMetodList.add({ severity: 'success', summary: 'Успешно', detail: 'Методист удален!' }),
                        this.confirmationServiceMetodist.close(),
                        this.reset()),
                        (error) => (this.messageServicedelMetodList.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
                            this.confirmationServiceMetodist.close())
                    )
            },
            reject: () => {
                this.confirmationServiceMetodist.close();
            }
        });
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        this.reset()
    }

    closeform() {
        this.closeEvent.emit();
    }

}