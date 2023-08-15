import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from '../../http.service';
declare var myLocalStorage: any; //Локальное хранилище

@Component({
    selector: 'upload-element',
    templateUrl: './upload.component.html'
})

export class uploadComponent {
    constructor(private httpservice: HttpService,
        private uploadref: DynamicDialogRef,
        private messageServiceUpload: MessageService,
        private uploadconfig: DynamicDialogConfig) { }
    type: string = '';

    ngOnInit() {
        this.type = this.uploadconfig.data.type;
    }

    onUpload(event: any) {

        let file = event.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file as Blob);
        reader.onload = () => {
            this.send_file(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    send_file(reader: any) {
        if (this.type == 'child') {
            this.httpservice
                .send_file({ "file": reader })
                .subscribe(
                    (data) => (this.uploadref.close(true)),
                    (error) => (this.messageServiceUpload.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })))
        }
        else if (this.type == 'metodist') {
            this.httpservice
                .send_file_metodist({ "file": reader })
                .subscribe(
                    (data) => (this.uploadref.close(true)),
                    (error) => (this.messageServiceUpload.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })))
        }
    }
}