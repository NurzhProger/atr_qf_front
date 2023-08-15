import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { HttpService } from '../../http.service';
import { metodistelementComponent } from 'src/app/dirs/metodist/metodistelement';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { metodistView } from '..//../interfaces';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'metodistadm-list',
    templateUrl: './metodistlist.html'
})


export class metodistlistadminComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceMetodist: ConfirmationService,
        public dialogServiceMetodistList: DialogService,
        public MetodistListref: DynamicDialogRef,
        private messageServicedelMetodList: MessageService) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    pages: number[] = [];
    metodistViewList!: metodistView;
    searchmetodist: string = '';
    metodist: any = [];
    pageEvent: number = 1;
    loading = false;
    tableData: any[] = [];
    showClearIcon: boolean = false;

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
        this.getmetodistlist()
    }

    getmetodistlist() {
        this.loading = false
        this.httpservice
            .getmetodistlistadmin(this.pageEvent, this.searchmetodist)
            .pipe(
                timeout(13000),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        this.messageServicedelMetodList.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
                    }
                    else {
                        this.messageServicedelMetodList.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
                    }
                    return throwError('Произошла ошибка: ' + error.message);
                })

            )
            .subscribe(
                (data) => (this.metodist = data, this.loading = true));
    }

    reset() {
        this.getmetodistlist()
    }

    onInputChange(newValue: string) {
        this.searchmetodist = newValue;
        this.showClearIcon = this.searchmetodist.trim().length > 0;
    }

    clearInput() {
        this.searchmetodist = '';
        this.showClearIcon = false;
        this.searchInput.nativeElement.focus();
        this.reset();
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
                    .subscribe((data) => (
                        this.messageServicedelMetodList.add({ severity: 'success', summary: 'Успешно', detail: 'Методист удален!' }),
                        this.getmetodistlist(),
                        this.confirmationServiceMetodist.close()),
                        (error) => (this.messageServicedelMetodList.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
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