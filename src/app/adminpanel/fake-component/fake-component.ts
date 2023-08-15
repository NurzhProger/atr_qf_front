import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from '../../http.service';
import { orguser } from '../../interfaces';
import { PhotoService } from './photoservice';

declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'app-fake',
    templateUrl: './fake-component.html'
})



export class FakeComponent {
    displayBasic: boolean;
    images: any;
    otherimages: any = [];
    res: any;
    visible: boolean = false;
    position: string = 'center';

    @Output() closeEvent = new EventEmitter<any>();
    constructor(
        private httpservice: HttpService,
        private msgFake: MessageService,) { }

    ngOnInit() {
        this.reset()
    }

    showFoto() {
        this.visible = true
        if (this.visible == true) {
            this.otherimages = []
            return this.httpservice
                .getOtherFoto(this.images.iin, this.images.id)
                .subscribe((images) => (this.res = images,
                    this.otherimages = this.res),
                    (error) => (this.msgFake.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить фото ребенка!' })))
        }
        else {
            return this.otherimages = []
        }
    }

    sendresult(result: string) {
        this.visible = false
        return this.httpservice
            .getFakeImgUrl(result, this.images.id)
            .subscribe((images) => (this.res = images,
                this.images = this.res[0]))
    }

    closeform() {
        this.closeEvent.emit();
    }

    reset() {
        this.visible = false
        return this.httpservice
            .getFakeImgUrl()
            .subscribe((images) => (this.res = images,
                this.images = this.res[0]))
    }
}