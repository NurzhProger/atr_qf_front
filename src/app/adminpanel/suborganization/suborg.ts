import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from 'src/app/http.service';
import { SubOrg } from 'src/app/interfaces';
import { organizationelementComponent } from '../organization/organization-element';
import { orgselectComponent } from '../organization/organization-select';

@Component({
    selector: 'suborg-detail',
    templateUrl: './suborg.html'
})

export class SubOrgDetail implements OnInit {

    request: any = [];
    org_id = '';
    org_name = '';
    searchorg = '';
    pageEvent: number = 1;
    pages: number[] = [];
    loading = false;
    tableData: any[] = [];

    constructor(private httpservice: HttpService,
        private confirmationSubOrg: ConfirmationService,
        private messageSubOrg: MessageService,
        private dialogServiceSub: DialogService,
        private Subref: DynamicDialogRef,
        private subconfig: DynamicDialogConfig) { }
    @Output() closeEvent = new EventEmitter<any>();

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

        this.org_id = this.subconfig.data.org_id;
        this.org_name = this.subconfig.data.org_name;
        this.getsuborg();
    }

    getsuborg() {
        this.loading = false
        return this.httpservice
            .getsuborg(this.pageEvent, this.org_id, this.searchorg, true)
            .subscribe(
                (data) => (this.request = data, this.loading = true))
    }

    search() {
        this.getsuborg();
    }

    onRowEdit(org_id: string) {

        this.Subref = this.dialogServiceSub.open(organizationelementComponent,
            {
                header: 'Редактирование организации',
                width: 'calc(80%)',
                height: 'calc(100%)',
                data: { id: org_id }
            })
    }

    deleteSubOrg(org: any) {
        this.confirmationSubOrg.confirm({
            message: 'Вы действительно хотите удалить ' + org.org_name + '?',
            header: 'Удаление организации из иерархии',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.httpservice
                    .delete_suborg(org.id)
                    .subscribe((data) => (
                        this.messageSubOrg.add({ severity: 'success', summary: 'Успешно', detail: 'Организация удалена!' }),
                        this.getsuborg(),
                        this.confirmationSubOrg.close())
                    )
            },
            reject: () => {
                this.confirmationSubOrg.close();
            }
        });
    }

    openOrg() {
        this.Subref = this.dialogServiceSub.open(orgselectComponent,
            {
                header: 'Выбор организации',
                width: 'calc(60%)',
                height: 'calc(80%)',
                data: { org_id: this.org_id, suborg: false }
            })

        this.Subref.onClose.subscribe((org: any) => {
            if (org) {
                this.addsuborg(this.org_id, org.id_org)
            }
        })
    }

    addsuborg(id_parent: string, id_child: string) {
        this.httpservice
            .addsuborg(id_parent, id_child)
            .subscribe(
                (data) => (
                    this.messageSubOrg.add({ severity: 'success', summary: 'Успешно', detail: 'Организация добавлена!' }),
                    this.getsuborg()))
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        this.getsuborg()
    }
}