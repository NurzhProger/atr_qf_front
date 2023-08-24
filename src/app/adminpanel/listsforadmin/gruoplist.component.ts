import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { groupelementComponent } from 'src/app/dirs/group/groupelement.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { groupView } from '..//../interfaces';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'groupadm-list',
    templateUrl: './grouplist.html'
})


export class grouplistadmComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceGroup: ConfirmationService,
        public dialogServiceGroupList: DialogService,
        private messageServicedel: MessageService,
        public groupListref: DynamicDialogRef) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    groupViewList!: groupView;
    searchgroup: string = '';
    group: any = [];
    pageEvent: number = 1;
    loading = false;
    tableData: any[] = [];
    showClearIcon = false
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef

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
        this.getgrouplist()
    }

    getgrouplist() {
        this.loading = false
        this.httpservice
            .getgrouplist(this.pageEvent, "", this.searchgroup)
            .pipe(
                timeout(13000), // установка таймаута на 5 секунд
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        this.messageServicedel.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
                    }
                    else {
                        this.messageServicedel.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
                    }
                    return throwError('Произошла ошибка: ' + error.message);
                })

            )
            .subscribe(
                (data) => (this.group = data, this.loading = true))
    }

    reset() {
        this.getgrouplist()
    }

    onInputChange(newValue: string) {
        this.searchgroup = newValue;
        this.showClearIcon = this.searchgroup.trim().length > 0;
    }

    clearInput() {
        this.searchgroup = '';
        this.showClearIcon = false;
        this.searchInput.nativeElement.focus();
        this.getgrouplist();
    }

    onRowEdit(group: groupView) {
        this.groupViewList = group;

        this.groupListref = this.dialogServiceGroupList.open(groupelementComponent,
            {
                header: 'Редактирование воспитательной группы',
                width: '60%',
                height: '100%',
                data: { data: this.groupViewList, type: 'edit' }
            });

        this.groupListref.onClose.subscribe((data) => (
            this.getgrouplist())
        );
    }

    openNew() {
        this.groupViewList = {
            id_org: '',
            org_name: '',
            id_group: '*',
            group_name: '',
            group_age: '',
            group_count: '',
            first_name: '',
            last_name: '',
            username: '',
            category: ''
        }
        this.groupListref = this.dialogServiceGroupList.open(groupelementComponent,
            {
                header: 'Создание воспитательной группы',
                width: '60%',
                height: '100%',
                data: { data: this.groupViewList, type: 'add' }
            });
        this.groupListref.onClose.subscribe((data) => (
            this.getgrouplist())
        );
    }

    deleteGroup(groupView: groupView) {
        let mass = [{ "id_group": groupView.id_group, "id_org": groupView.id_org }]
        this.confirmationServiceGroup.confirm({
            message: 'Вы действительно хотите удалить ' + groupView.group_name + '?',
            header: 'Удаление воспитательной группы',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.httpservice
                    .group_edit('del', mass)
                    .subscribe((data) => {
                        this.messageServicedel.add({ severity: 'success', summary: 'Успешно', detail: 'Группа успешно удалена!' }),
                            this.confirmationServiceGroup.close(), this.getgrouplist()
                    },
                        (error) => (this.messageServicedel.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
                            this.confirmationServiceGroup.close())
                    )
            },
            reject: () => {
                this.confirmationServiceGroup.close();
            }
        });
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        this.getgrouplist()
    }

    closeform() {
        this.closeEvent.emit();
    }

}