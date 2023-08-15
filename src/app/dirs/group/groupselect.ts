import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { groupelementComponent } from 'src/app/dirs/group/groupelement.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { groupView } from '..//../interfaces';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'group-select',
    templateUrl: './groupselect.html',
    styleUrls: ['./group.css']
})


export class groupselectComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceGroupSelect: ConfirmationService,
        public dialogServiceGroupSelect: DialogService,
        public groupElref: DynamicDialogRef,
        private messageServicedelSelect: MessageService,
        public groupSelectref: DynamicDialogRef,
        private grconfig: DynamicDialogConfig) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    groupViewSelect!: groupView;
    searchgroup: string = '';
    group: any = [];
    selectedgroup: any;
    org_id = '';
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
        this.org_id = this.grconfig.data.org_id
        this.getgrouplist()
    }

    getgrouplist() {
        this.loading = false
        return this.httpservice
            .getgrouplist(this.pageEvent, this.org_id, this.searchgroup)
            .subscribe(
                (data) => (this.group = data, this.loading = true))
    }

    reset() {
        this.getgrouplist()
    }

    onRowEdit(group: groupView) {
        this.groupViewSelect = group;

        this.groupElref = this.dialogServiceGroupSelect.open(groupelementComponent,
            {
                header: 'Редактирование воспитательной группы',
                width: 'calc(60%)',
                height: 'calc(100%)',
                data: { data: this.groupViewSelect, type: 'edit' }
            });

        this.groupElref.onClose.subscribe((data) => (
            this.getgrouplist()));
    }

    selectGroup() {

        if (!this.selectedgroup) {
            this.messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите группу!' })
            return
        }

        this.groupSelectref.close(this.selectedgroup);
    }

    close() {
        this.groupSelectref.close();
    }

    onRowSelect(event: any) {
        this.groupSelectref.close(event);
    }

    openNew() {
        this.groupViewSelect = {
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
        this.groupSelectref = this.dialogServiceGroupSelect.open(groupelementComponent,
            {
                header: 'Создание воспитательной группы',
                width: 'calc(60%)',
                height: 'calc(100%)',
                data: { data: this.groupViewSelect, type: 'add' }
            });
        this.groupSelectref.onClose.subscribe((data) => (
            this.getgrouplist()));
    }

    deleteGroup(groupView: groupView) {
        this.confirmationServiceGroupSelect.confirm({
            message: 'Вы действительно хотите удалить ' + groupView.group_name + '?',
            header: 'Удаление воспитательной группы',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.httpservice
                    .group_edit('del', [{ "id_group": groupView.id_group, "id_org": groupView.id_org }])
                    .subscribe((data) => (this.group = data,
                        this.messageServicedelSelect.add({ severity: 'success', summary: 'Успешно', detail: 'Группа удалена!' }),
                        this.confirmationServiceGroupSelect.close()),
                        (error) => (this.messageServicedelSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
                            this.confirmationServiceGroupSelect.close())
                    )
            },
            reject: () => {
                this.confirmationServiceGroupSelect.close();
            }
        });
    }

    search() {
        this.getgrouplist()
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        this.getgrouplist()
    }

    closeform() {
        this.closeEvent.emit();
    }

}