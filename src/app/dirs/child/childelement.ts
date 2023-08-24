import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from '../../http.service';
import { groupselectComponent } from '../group/groupselect';
import { childView, groupView } from '..//../interfaces';
import { MessageService } from 'primeng/api';
import { orgselectComponent } from 'src/app/adminpanel/organization/organization-select';
import { groupelementComponent } from '../group/groupelement.component';
declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'child-element',
    templateUrl: './childelement.html',
    styleUrls: ['./childelement.css']
})


export class childelementComponent {
    constructor(private httpservice: HttpService,
        private groupSelectref: DynamicDialogRef,
        private childelementref: DynamicDialogRef,
        private messageServiceSaveElChild: MessageService,
        private groupSelectdialogService: DialogService,
        private childelementconfig: DynamicDialogConfig) { }

    childForm: FormGroup;
    groupViewElement: groupView;
    childView: childView = {
        iin: '',
        name: '',
        id_org: '',
        org_name: '',
        id_group: '',
        group_name: '',
        registered: '',
        birthday: '',
        gender: '',
        category: '',
        image_url: '',
        visit_photo: ''
    };
    childElement: any = [];
    genderOptions = [
        { label: 'Мужской', value: 'm' },
        { label: 'Женский', value: 'w' }
    ];
    type: string = '';
    type_edit: boolean = false;
    id_group: string = '';
    iin: string = '';
    today: string = '';
    readonly = false
    checkiin = false
    user_id_org = ''
    user_org_name = ''
    // visit_photo: string = '';

    ngOnInit() {
        this.childForm = new FormGroup({
            orgFormControl: new FormControl('', Validators.required),
            namechildFormControl: new FormControl('', Validators.required),
            GroupFormControl: new FormControl('', Validators.required),
            IINFormControl: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(12), this.iinLengthValidator()])
        });

        this.iin = this.childelementconfig.data.iin || undefined;
        this.id_group = this.childelementconfig.data.id_group;
        this.type = this.childelementconfig.data.type;

        if (this.type == 'edit') {
            this.httpservice
                .getchildbyiin(this.iin)
                .subscribe(
                    (data) => (this.insertToFrom(data)));
        }
        else if (this.type == 'add') {
            this.readonly = true
            this.user_id_org = this.childelementconfig.data.id_org
            this.user_org_name = this.childelementconfig.data.org_name
            this.childView.id_org = this.childelementconfig.data.id_org;
            this.childView.org_name = this.childelementconfig.data.org_name;
        }
        else if (this.type == 'openfromtabel') {
            this.type_edit = true;
            this.childView = this.childelementconfig.data.child;
            let status = this.childelementconfig.data.status;
            let today = this.childelementconfig.data.today || '';
            let id_org = this.childelementconfig.data.id_org || '';
            this.httpservice
                .getchildstatusbyiin(status, id_org, this.childView.id_group, today, this.childView.iin)
                .subscribe(
                    (data) => (this.childElement = data, this.childView = this.childElement[0]),
                    (error) => (this.messageServiceSaveElChild.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }

    clearGroup() {
        this.childView.id_group = '';
        this.childView.group_name = '';
    }

    checkIIN() {
        this.checkiin = true
        this.httpservice
            .getchildbyiin(this.childView.iin)
            .subscribe(
                (data) => (this.insertToFrom(data)))
    }

    changeIIN() {
        if (this.checkiin) {
            this.childView = {
                iin: this.childView.iin,
                name: '',
                id_org: this.user_id_org,
                org_name: this.user_org_name,
                id_group: '',
                group_name: '',
                registered: '',
                birthday: '',
                gender: '',
                category: '',
                image_url: '',
                visit_photo: ''
            }
        }
    }

    insertToFrom(child: any) {
        if (child.data.length > 0) {
            if (child.data[0].id_org !== '') {
                this.readonly = true
                this.childView = child.data[0]
            }
            else {
                this.readonly = false
                this.childView = child.data[0]
                console.log(this.childView, this.user_id_org, this.user_org_name);

                this.childView.id_org = this.user_id_org
                this.childView.org_name = this.user_org_name
            }
        }
        else {
            this.readonly = false
            this.childView = {
                iin: this.childView.iin,
                name: '',
                id_org: this.user_id_org,
                org_name: this.user_org_name,
                id_group: '',
                group_name: '',
                registered: '',
                birthday: '',
                gender: '',
                category: '',
                image_url: '',
                visit_photo: ''
            }
        }
    }

    selectGroup() {
        this.groupSelectref = this.groupSelectdialogService.open(groupselectComponent,
            {
                header: 'Выбор группы',
                width: 'calc(60%)',
                height: 'calc(80%)',
                data: { org_id: this.childView.id_org }
            });

        this.groupSelectref.onClose.subscribe((group: any) => {
            if (group) {
                this.childView.group_name = group.group_name,
                    this.childView.id_group = group.id_group
            }
        })
    }

    openOrg() {
        this.groupSelectref = this.groupSelectdialogService.open(orgselectComponent,
            {
                header: 'Выбор организации',
                width: 'calc(60%)',
                height: 'calc(80%)',
                data: { suborg: true }
            })

        this.groupSelectref.onClose.subscribe((org: any) => {
            if (org) {
                this.childView.id_org = org.id_org,
                    this.childView.org_name = org.org_name
            }
        })
    }

    openGroup() {
        let res: any;
        this.httpservice
            .getgroupelement(this.childView.id_group)
            .subscribe(
                (data) => (res = data, this.groupViewElement = res[0], this.openGroupComponent(this.groupViewElement)),
                (error) => (this.messageServiceSaveElChild.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })))
    }

    openGroupComponent(groupView: groupView) {
        this.groupSelectref = this.groupSelectdialogService.open(groupelementComponent,
            {
                header: 'Редактирование воспитательной группы',
                width: '60%',
                height: '100%',
                data: { data: groupView, type: 'edit' }
            })
    }


    iinLengthValidator(): ValidatorFn {
        return (): { [key: string]: any } | null => {
            if (!this.childView.iin) {
                return null; // no validation error if the input is empty
            }

            let isValid = ((Number(this.childView.iin.substring(2, 4)) < 13) &&
                (Number(this.childView.iin.substring(4, 6)) < 32) &&
                ((Number(this.childView.iin.substring(6, 7)) == 5) || (Number(this.childView.iin.substring(6, 7)) == 6)
                    || (Number(this.childView.iin.substring(6, 7)) == 4) || (Number(this.childView.iin.substring(6, 7)) == 3)));

            if (isValid) {
                this.makeGender();
                this.makeDate();
            }

            return isValid ? null : { iin: { value: this.childView.iin } };
        };
    }

    makeDate() {
        //получаем дату рождения
        let year = '';

        if (Number(this.childView.iin.substring(0, 2)) <= 25) {
            year = '20' + this.childView.iin.substring(0, 2);
        }
        else {
            year = '19' + this.childView.iin.substring(0, 2);
        }

        let month = this.childView.iin.substring(2, 4);
        let day = this.childView.iin.substring(4, 6);

        this.childView.birthday = this.toLocaleDate(year + ',' + month + ',' + day);
    }

    makeGender() {
        // получаем пол ребенка
        if ((Number(this.childView.iin.substring(6, 7)) == 5)
            || (Number(this.childView.iin.substring(6, 7)) == 3)) {
            this.childView.gender = 'm';
        }
        else {
            this.childView.gender = 'w';
        }
    }

    saveChild() {
        let mass: any;

        if (this.childView.category == null) {
            this.childView.category = 'gor9'
        }

        mass = [this.childView];
        if (this.childView.id_group == '') {
            this.httpservice
                .child_edit('del', this.childView.id_group, [{ "iin": this.childView.iin, 'id_org': this.childView.id_org }])
                .subscribe((data) => (this.messageServiceSaveElChild.add({ severity: 'success', summary: 'Успешно', detail: 'Данные ребенка сохранены!' }),
                    this.childelementref.close(true)),
                    (error) => (this.messageServiceSaveElChild.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))

        }
        else {
            this.httpservice
                .child_edit(this.type, this.id_group, mass)
                .subscribe(
                    (data) => (this.messageServiceSaveElChild.add({ severity: 'success', summary: 'Успешно', detail: 'Данные ребенка сохранены!' }),
                        this.childelementref.close(true)),
                    (error) => (this.messageServiceSaveElChild.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })))
        }

    }

    toLocaleDate(dateForStr: string) {
        return new Date(dateForStr).toLocaleDateString();
    }

    changedate() {
        this.childView.birthday = this.toLocaleDate(this.childView.birthday);
    }

    close() {
        this.childelementref.close(false);
    }


}