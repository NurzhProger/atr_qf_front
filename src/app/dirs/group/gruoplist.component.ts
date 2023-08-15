import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { groupelementComponent } from 'src/app/dirs/group/groupelement.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { groupView } from '..//../interfaces';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'group-list',
    templateUrl: './grouplist.component.html',
    styleUrls: ['./group.css']
})


export class grouplistComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceGroup: ConfirmationService,
        public dialogServiceGroupList: DialogService,
        private messageServicedel: MessageService,
        public groupListref: DynamicDialogRef) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    groupViewList: groupView;
    searchgroup: string = '';
    group: any = [];
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
        this.reset()
    }

    getgrouplist(page: number, search: string) {
        this.httpservice
            .getgrouplist(page, '', search)
            .subscribe(
                (data) => (this.group = data, this.loading = true))
    }

    reset() {
        this.loading = false
        this.getgrouplist(this.pageEvent, this.searchgroup)
    }

    onRowEdit(group: groupView) {
        this.groupViewList = group;
        console.log(group);


        this.groupListref = this.dialogServiceGroupList.open(groupelementComponent,
            {
                header: 'Редактирование воспитательной группы',
                width: '60%',
                height: '100%',
                data: { data: this.groupViewList, type: 'edit' }
            });

        this.groupListref.onClose.subscribe((data) => (
            this.reset()
        )
        )
    }

    openNew() {
        this.groupViewList = {
            id_org: '',
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
            this.reset())
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
                            this.confirmationServiceGroup.close(), this.reset()
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
        this.reset()
    }

    closeform() {
        this.closeEvent.emit();
    }

}