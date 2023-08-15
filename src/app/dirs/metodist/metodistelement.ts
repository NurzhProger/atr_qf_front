import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { orgselectComponent } from 'src/app/adminpanel/organization/organization-select';
import { HttpService } from '../../http.service';
import { metodistView } from '..//../interfaces';
declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'metodist-element',
    templateUrl: './metodistelement.html'
})


export class metodistelementComponent {
    constructor(private httpservice: HttpService,
        private metodistSelectref: DynamicDialogRef,
        private childelementref: DynamicDialogRef,
        private messageServiceadd: MessageService,
        private metodistSelectdialogService: DialogService,
        private metodistelementconfig: DynamicDialogConfig) { }

    metodistForm: FormGroup;
    metodistView: metodistView;
    secondpassword: string = '';
    changepass: boolean = false;
    type: string = '';
    newchild: boolean = false;
    id_group: string = '';
    iin: string = '';
    readonly: boolean = false;

    ngOnInit() {
        this.metodistForm = new FormGroup({
            nameFormControl: new FormControl('', Validators.required),
            orgFormControl: new FormControl('', Validators.required),
            emailFormControl: new FormControl('', [Validators.required, Validators.email]),
            IINFormControl: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
            PasswordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)])
        });

        this.metodistView = this.metodistelementconfig.data.data;
        this.type = this.metodistelementconfig.data.type;

        if (this.type == 'changepass') {
            this.readonly = true;
        }

    }

    openOrg() {
        this.metodistSelectref = this.metodistSelectdialogService.open(orgselectComponent,
            {
                header: 'Выбор организации',
                width: 'calc(60%)',
                height: 'calc(80%)',
                data: { suborg: true }
            })

        this.metodistSelectref.onClose.subscribe((org: any) => {
            if (org) {
                this.metodistView.id_org = org.id_org,
                    this.metodistView.org_name = org.org_name
            }
        })
    }

    change(mainpassword: String) {
        if (mainpassword == '' && this.secondpassword == '') {
            this.changepass = false
        } else {
            this.changepass = mainpassword == this.secondpassword;
        }
    }

    saveMetodist() {
        let mass: any;
        mass = this.metodistView;

        this.httpservice
            .metodist_edit(this.type, mass)
            .subscribe(
                (data) => (this.messageServiceadd.add({ severity: 'success', summary: 'Успешно', detail: 'Данные воспитателя сохранены!' }),
                    this.childelementref.close(true)),
                (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
                    this.childelementref.close(true)));

    }

    close() {
        this.childelementref.close(false);
    }


}