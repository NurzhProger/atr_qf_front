import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { childelementComponent } from 'src/app/dirs/child/childelement';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { childListView } from '..//../interfaces';
import { uploadComponent } from 'src/app/dirs/upload/upload.component';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'childadm-list',
    templateUrl: './childlist.html',
    styleUrls: ['./childlist.css']
})


export class childlistAdmComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceChild: ConfirmationService,
        public dialogServiceChildList: DialogService,
        private messageServicedelChildList: MessageService,
        public uploadref: DynamicDialogRef,
        public childListref: DynamicDialogRef,
        public dialogServiceUpload: DialogService) {
    }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    childListView!: childListView;
    searchchild: string = '';
    searchiin: string = '';
    child: any = [];
    pageEvent: number = 1;
    loading = false;
    tableData: any[] = [];
    showClearIcon: boolean = false;
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    onInputChange(newValue: string) {
        this.searchchild = newValue;
        this.showClearIcon = this.searchchild.trim().length > 0;
    }

    clearInput() {
        this.searchchild = '';
        this.showClearIcon = false;
        this.searchInput.nativeElement.focus();
        this.getchildlist();
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
        ];
        this.getchildlist()
    }

    getchildlist() {
        this.loading = false
        return this.httpservice
            .getchildlistadmin(this.pageEvent, this.searchchild)
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
                (data) => (this.child = data, this.loading = true));
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.child) {
            for (let customer of this.child) {
                if (customer.group_name === name) {
                    total++;
                }
            }
        }

        return total;
    }

    onRowEdit(child: childListView) {
        this.childListref = this.dialogServiceChildList.open(childelementComponent,
            {
                header: 'Редактирование ребенка',
                width: 'calc(60%)',
                height: 'calc(60%)',
                data: { iin: child.iin, id_group: child.id_group, type: 'edit' }
            });

        this.childListref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.getchildlist()
            }
        });
    }

    openUpload() {
        this.uploadref = this.dialogServiceUpload.open(uploadComponent,
            {
                header: 'Импорт детей',
                width: '40%',
                height: '30%'
            });

        this.uploadref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.getchildlist(),
                    this.messageServicedelChildList.add({ severity: 'success', summary: 'Успешно', detail: 'Данные загружены!' })
            }
        });
    }

    openNew() {
        this.childListref = this.dialogServiceChildList.open(childelementComponent,
            {
                header: 'Создание ребенка',
                width: 'calc(60%)',
                height: 'calc(60%)',
                data: { iin: '', id_group: '', type: 'add' }
            });

        this.childListref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.getchildlist()
            }
        });
    }

    toLocaleDate() {

        return new Date().toLocaleDateString();

    }

    deletevisit(child: childListView) {
        this.confirmationServiceChild.confirm({
            message: 'Вы действительно хотите удалить посещение ' + child.name + '?',
            header: 'Удаление посещения',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let mass = [{ 'id_org': child.id_org, 'id_group': child.id_group, 'iin': child.iin, 'datestatus': this.toLocaleDate() }]
                this.httpservice
                    .deletevisit(mass)
                    .subscribe(
                        (data) => (this.messageServicedelChildList.add({ severity: 'success', summary: 'Успешно', detail: 'Посещение ребенка удалено!' })),
                        (error) => (this.messageServicedelChildList.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось изменить данные ребенка!' })))
            },
            reject: () => {
                this.confirmationServiceChild.close()
            }
        })
    }

    deregister(child: any) {
        this.confirmationServiceChild.confirm({
            message: 'Вы действительно хотите снять с регистрации ' + child.name + '?',
            header: 'Снятие с регистрации',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let mass = [{ iin: child.iin, id_org: child.id_org }]

                this.httpservice
                    .child_edit('clearface', '', mass)
                    .subscribe(
                        (data) => (this.messageServicedelChildList.add({ severity: 'success', summary: 'Успешно', detail: 'Ребенок снят с регистрации!' }),
                            this.confirmationServiceChild.close()),
                        (error) => (this.messageServicedelChildList.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
                            this.confirmationServiceChild.close()))
            },
            reject: () => {
                this.confirmationServiceChild.close()
            }
        })
    }

    deleteChild(childListView: childListView) {
        this.confirmationServiceChild.confirm({
            message: 'Вы действительно хотите удалить ' + childListView.name + '?',
            header: 'Удаление ребенка из группы',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.httpservice
                    .child_edit('del', childListView.id_group, [{ "iin": childListView.iin, "id_org": childListView.id_org }])
                    .subscribe((data) => (
                        this.messageServicedelChildList.add({ severity: 'success', summary: 'Успешно', detail: 'Ребенок удален!' }),
                        this.confirmationServiceChild.close(), this.getchildlist(),
                        this.confirmationServiceChild.close())
                    )
            },
            reject: () => {
                this.confirmationServiceChild.close();
            }
        });
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        this.getchildlist()
    }

    closeform() {
        this.closeEvent.emit();
    }

}