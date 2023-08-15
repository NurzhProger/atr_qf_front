import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from '../../http.service';
import { groupView } from '..//../interfaces';
import { metodistselectComponent } from '../metodist/metodistselect';
import { childelementComponent } from 'src/app/dirs/child/childelement';
import { childselectComponent } from 'src/app/dirs/child/childselect';
import { childListView } from '..//../interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { metodistelementComponent } from '../metodist/metodistelement';
declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'group-element',
    templateUrl: './groupelement.component.html',
    styleUrls: ['./group.css']
})


export class groupelementComponent {
    constructor(private httpservice: HttpService,
        private confirmationServiceChildGroupEl: ConfirmationService,
        public groupelementref: DynamicDialogRef,
        public metodSelectref: DynamicDialogRef,
        public childListGroupref: DynamicDialogRef,
        private messageServiceSaveEl: MessageService,
        public dialogServiceChildListGroup: DialogService,
        public metodSelectdialogService: DialogService,
        public groupelementconfig: DynamicDialogConfig) { }

    groupForm!: FormGroup;
    groupView: groupView;
    childListView!: childListView;
    groupAgeOptions = [
        { label: '1-2', value: '1' },
        { label: '2-3', value: '2' },
        { label: '3-4', value: '3' },
        { label: '4-5', value: '4' },
        { label: '5-6', value: '5' }
    ];
    groupCategory = [
        { label: 'Неполный день', value: 'gorp' },
        { label: 'Режим пребывания 9 часов', value: 'gor9' },
        { label: 'Режим пребывания 10,5 часов', value: 'gor10' },
        { label: 'Санаторный', value: 'gors' },
        { label: 'Коррекционный', value: 'gork' }
    ];
    type: string = '';
    searchchild: string = '';
    saved: boolean = false; // новая группа или нет, для доступности кнопки "Сохранить"
    childOfGroup: any = [];
    pageEvent: number = 1;
    pages: number[] = [];
    loading = false;
    tableData: any[] = [];

    ngOnInit() {
        this.groupForm = new FormGroup({
            nameGrFormControl: new FormControl('', Validators.required),
            MetodistFormControl: new FormControl('', Validators.required),
            CountFormControl: new FormControl('', Validators.required),
            // CategoryFormControl: new FormControl('', Validators.required)
        });

        this.groupView = this.groupelementconfig.data.data;
        this.type = this.groupelementconfig.data.type;
        if (this.groupView.id_group !== '*') {
            this.saved = true;
            this.getchildlist()
        }
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
    }

    getchildlist() {
        this.loading = false
        return this.httpservice
            .getchildlist(this.pageEvent, this.groupView.id_org, this.groupView.id_group, this.searchchild)
            .subscribe(
                (data) => (this.childOfGroup = data, this.loading = true));
    }

    saveGroup() {
        let mass: any;

        mass = [this.groupView];

        this.httpservice
            .group_edit(this.type, mass)
            .subscribe(
                (data) => (this.saved = true,
                    this.messageServiceSaveEl.add({ severity: 'success', summary: 'Успешно', detail: 'Группа успешно отредактирована!' })),
                (error) => (this.messageServiceSaveEl.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
    }

    openNew() {
        this.childListGroupref = this.dialogServiceChildListGroup.open(childselectComponent,
            {
                header: 'Выбор ребенка',
                width: 'calc(60%)',
                height: 'calc(80%)',
                data: {
                    id_org: this.groupView.id_org,
                    id_group: this.groupView.id_group,
                    group_name: this.groupView.group_name
                }
            });

        this.childListGroupref.onClose.subscribe((save: boolean) => {
            this.getchildlist()
        });
    }

    onRowEdit(child: childListView) {

        this.childListGroupref = this.dialogServiceChildListGroup.open(childelementComponent,
            {
                header: 'Редактирование ребенка',
                width: 'calc(60%)',
                height: 'calc(60%)',
                data: { iin: child.iin, id_group: child.id_group, type: 'edit' }
            });

        this.childListGroupref.onClose.subscribe((save: boolean) => {
            if (save) {
                this.getchildlist()
            }
        });
    }

    search() {
        this.getchildlist()
    }

    deleteChild(childListView: childListView) {
        this.confirmationServiceChildGroupEl.confirm({
            message: 'Вы действительно хотите удалить ' + childListView.name + '?',
            header: 'Удаление ребенка из группы',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.httpservice
                    .child_edit('del', childListView.id_group, [{ "iin": childListView.iin }])
                    .subscribe((data) => (
                        this.getchildlist(),
                        this.messageServiceSaveEl.add({ severity: 'success', summary: 'Успешно', detail: 'Ребенок удален из группы!' }),
                        this.confirmationServiceChildGroupEl.close()),
                        (error) => (this.messageServiceSaveEl.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить ребенка!' }))
                    )
            },
            reject: () => {
                this.confirmationServiceChildGroupEl.close();
            }
        });
    }

    selectMetodist() {
        this.metodSelectref = this.metodSelectdialogService.open(metodistselectComponent,
            {
                header: 'Выбор воспитателя',
                width: 'calc(60%)',
                height: 'calc(100%)'
            });

        this.metodSelectref.onClose.subscribe((metodist: any) => {
            if (metodist) {
                this.groupView.first_name = metodist.first_name,
                    this.groupView.username = metodist.username
            }
        })
    }

    paginatorClick(eventpag: any) {
        this.pageEvent = eventpag.page + 1;
        this.loading = false
        this.getchildlist()
    }

    close() {
        this.groupelementref.close(true);
    }


}