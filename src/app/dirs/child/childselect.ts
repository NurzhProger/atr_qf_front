import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { childelementComponent } from 'src/app/dirs/child/childelement';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { childListView, childView } from '../../interfaces';
import { uploadComponent } from 'src/app/dirs/upload/upload.component';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'child-select',
    templateUrl: './childselect.html'
})


export class childselectComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceChild: ConfirmationService,
        public dialogServiceChildList: DialogService,
        private messageServicedelChildSelect: MessageService,
        public uploadref: DynamicDialogRef,
        public childListref: DynamicDialogRef,
        public dialogServiceUpload: DialogService,
        public childselectconfig: DynamicDialogConfig) { }
    @Output() closeEvent = new EventEmitter<any>();
    @Output() newItemEvent = new EventEmitter<any>();

    pages: number[] = [];
    childListView!: childListView;
    childView!: childView;
    searchchild: string = '';
    selectedChild: any;
    child: any = [];
    pageEvent: number = 1;
    id_org = ''
    id_group: string = '';
    group_name: string = '';
    childElement: any = [];
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
        this.id_org = this.childselectconfig.data.id_org || '';
        this.id_group = this.childselectconfig.data.id_group || '';
        this.group_name = this.childselectconfig.data.group_name || '';
        this.childselect()
    }

    childselect() {
        this.loading = false
        return this.httpservice
            .getchildselect(this.pageEvent, this.id_group, this.searchchild, this.id_org)
            .subscribe(
                (data) => (this.child = data, this.loading = true));
    }

    reset() {
        this.childselect()
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
                this.childselect()
            }
        });
    }

    child_edit(childView: childView, first_id_group: string) {
        let mass: any;
        mass = [childView];

        this.httpservice
            .child_edit('edit', first_id_group, mass)
            .subscribe(
                (data) => (this.childListref.close(true)),
                (error) => (this.messageServicedelChildSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }

    onRowSelect(child: childListView) {
        let first_id_group = '';
        this.httpservice
            .getchildbyiin(child.iin)
            .subscribe(
                (data) => (this.childElement = data, this.childView = this.childElement.data[0],
                    first_id_group = this.childView.id_group,
                    this.childView.id_group = this.id_group, this.childView.group_name = this.group_name,
                    this.child_edit(this.childView, first_id_group)));
    }

    selectChild() {

        if (!this.selectedChild) {
            this.messageServicedelChildSelect.add({ severity: 'error', summary: 'Ошибка', detail: 'Выберите ребенка!' })
            return
        }

        let first_id_group = '';
        this.httpservice
            .getchildbyiin(this.selectedChild.iin)
            .subscribe(
                (data) => (this.childElement = data,
                    this.childView = this.childElement.data[0],
                    first_id_group = this.childView.id_group,
                    this.childView.id_group = this.id_group,
                    this.childView.group_name = this.group_name,
                    this.child_edit(this.childView, first_id_group)));
        this.childListref.close(this.selectedChild);
    }

    close() {
        this.childListref.close();
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
                this.childselect()
            }
        });
    }

    deleteChild(childListView: childListView) {
        this.confirmationServiceChild.confirm({
            message: 'Вы действительно хотите удалить ' + childListView.name + '?',
            header: 'Удаление ребенка',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.httpservice
                    .child_edit('del', childListView.id_group, [{ "iin": childListView.iin }])
                    .subscribe((data) => (
                        this.messageServicedelChildSelect.add({ severity: 'success', summary: 'Успешно', detail: 'Ребенок удален!' }),
                        this.confirmationServiceChild.close(),
                        this.childselect()),
                        (error) => (this.messageServicedelChildSelect.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
                            this.confirmationServiceChild.close())
                    )
            },
            reject: () => {
                this.confirmationServiceChild.close();
            }
        });
    }

    search() {
        this.childselect();
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1
        this.childselect()
    }

    closeform() {
        this.closeEvent.emit();
    }

}