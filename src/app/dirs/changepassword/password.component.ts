import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from '../../http.service';
declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'change-password',
    templateUrl: './password.component.html'
})


export class changepasswordComponent {
    constructor(private httpservice: HttpService,
        public changeelementref: DynamicDialogRef,
        private messageServiceadd: MessageService) { }

    metodistForm!: FormGroup;
    firstpassword: string = '';
    secondpassword: string = '';
    changepass: boolean = false;

    ngOnInit() {

        this.metodistForm = new FormGroup({
            PasswordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)])
        });

    }

    change(mainpassword: String) {
        if (mainpassword == '' && this.secondpassword == '') {
            this.changepass = false
        } else {
            this.changepass = mainpassword == this.secondpassword;
        }
    }

    savePassword() {
        this.httpservice
            .change_pass(this.firstpassword)
            .subscribe(
                (data) => (this.changeelementref.close(true)),
                (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status }),
                    this.changeelementref.close(true)));

    }


}