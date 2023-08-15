import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../http.service';
import { childelementComponent } from 'src/app/dirs/child/childelement';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { childListView } from '..//../interfaces';
import { uploadComponent } from 'src/app/dirs/upload/upload.component';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'child-list',
    templateUrl: './childlist.html'
})


export class childlistComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceChild: ConfirmationService,
        public dialogServiceChildList: DialogService,
        private messageServicedelChildList: MessageService,
        public uploadref: DynamicDialogRef,
        public childListref: DynamicDialogRef,
        public dialogServiceUpload: DialogService) { }
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

    getchildlist(page: number, searchchild: string) {
        this.loading = false
        return this.httpservice
            .getchildlist(page, '', '', searchchild)
            .subscribe(
                (data) => (this.child = data, this.loading = true));
    }

    reset() {
        this.getchildlist(this.pageEvent, this.searchchild)
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
                this.reset()
            }
        });
    }

    openUpload() {
        this.uploadref = this.dialogServiceUpload.open(uploadComponent,
            {
                header: 'Импорт детей',
                width: '40%',
                height: '30%',
                data: { type: 'child' }
            });

        this.uploadref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.reset(),
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
                this.reset()
            }
        });
    }

    deleteChild(childListView: childListView) {
        this.confirmationServiceChild.confirm({
            message: 'Вы действительно хотите удалить ' + childListView.name + '?',
            header: 'Удаление ребенка из группы',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.httpservice
                    .child_edit('del', childListView.id_group, [{ "iin": childListView.iin }])
                    .subscribe((data) => (
                        this.messageServicedelChildList.add({ severity: 'success', summary: 'Успешно', detail: 'Ребенок удален!' }),
                        this.reset(),
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
        this.reset()
    }

    closeform() {
        this.closeEvent.emit();
    }

}