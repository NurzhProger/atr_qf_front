import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { organizationelementComponent } from './organization-element'
import { orguser } from '../../interfaces';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Component({
    selector: 'org-select',
    templateUrl: './organization-select.html'
})

export class orgselectComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceChild: ConfirmationService,
        private dialogServiceReqList: DialogService,
        private messageServiceOrgSel: MessageService,
        private OrgSelectref: DynamicDialogRef,
        private orgconfig: DynamicDialogConfig) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    orgView: orguser;
    searchorg: string = '';
    suborg = true;
    selectedOrg: any;
    org_id = '';
    request: any = [];
    pageEvent: number = 1;
    loading = false;
    tableData: any[] = [];
    showClearObl = false
    showClearRegion = false
    oblasttypes: any = []
    regiontypes: any = []
    id_obl = 1
    id_region = 0
    selected: any

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

        this.suborg = this.orgconfig.data.suborg;
        this.reset()
        this.id_region = 0
    }

    getsuborg() {
        if (this.id_region == null) {
            this.id_region = 0
        }

        return this.httpservice
            .getsuborg(this.pageEvent, '', this.searchorg, false, this.id_region)
            .subscribe((data) => (this.request = data, this.loading = true))
    }

    getnonsuborg(org_id: string) {

        return this.httpservice
            .getnonsuborg(this.pageEvent, org_id, this.searchorg, this.id_region)
            .pipe(
                timeout(13000),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        this.messageServiceOrgSel.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
                    }
                    else {
                        this.messageServiceOrgSel.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
                    }
                    return throwError('Произошла ошибка: ' + error.message);
                })

            )
            .subscribe((data) => (this.request = data, this.loading = true))
    }

    reset() {
        this.loading = false;

        if (this.id_region == null) {
            this.id_region = 0
        }

        this.pageEvent = 1
        if (this.suborg) {
            this.getsuborg()
        }
        else {
            this.org_id = this.orgconfig.data.org_id;
            this.getnonsuborg(this.org_id)
        }
    }

    search() {
        this.pageEvent = 1
        if (this.suborg) {
            this.getsuborg()
        }
        else {
            this.org_id = this.orgconfig.data.org_id;
            this.getnonsuborg(this.org_id)
        }
    }

    onRowEdit(org_id: string) {
        this.OrgSelectref = this.dialogServiceReqList.open(organizationelementComponent,
            {
                header: 'Редактирование организации',
                width: 'calc(80%)',
                height: 'calc(100%)',
                data: { id: org_id }
            });

        this.OrgSelectref.onClose.subscribe((save: boolean) => {
            if (save) {
                // this.getorglist(this.pageEvent, '')
            }
        });
    }

    onRowSelect(event: any) {
        this.OrgSelectref.close(event);
    }

    onSelected(org: any) {
        if (!this.selected) {
            this.messageServiceOrgSel.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите организацию!' })
            return
        }
        this.OrgSelectref.close(org)
    }

    selectOrg() {

        if (!this.selectedOrg) {
            this.messageServiceOrgSel.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите организацию!' })
            return
        }

        this.OrgSelectref.close(this.selectedOrg);
    }

    close() {
        this.OrgSelectref.close();
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        if (this.suborg) {
            this.getsuborg()
        }
        else {
            this.org_id = this.orgconfig.data.org_id;
            this.getnonsuborg(this.org_id)
        }
    }

    clearRegion() {
        this.id_region = 0
        this.changeregion()
    }

    changeregion() {
        this.showClearRegion = this.id_region !== 0
        this.reset()
    }

    getregion() {
        if (this.regiontypes.length == 0) {
            this.httpservice
                .getregiontype()
                .subscribe(
                    (data) => (
                        this.regiontypes = data
                    ),
                    (error) => (this.messageServiceOrgSel.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }

    closeform() {
        this.closeEvent.emit();
    }
}