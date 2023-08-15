import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from '../../http.service';
import { orguser } from '../../interfaces';

declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'request-element',
    templateUrl: './requestelement.component.html'
})


export class requestelementComponent {

    constructor(private httpservice: HttpService,
        public metodistSelectref: DynamicDialogRef,
        public childelementref: DynamicDialogRef,
        private messageServicereq: MessageService,
        public metodistSelectdialogService: DialogService,
        public reqelementconfig: DynamicDialogConfig) { }

    request: orguser = {
        id: '',
        id_obl: '',
        id_region: '',
        bin: '',
        org_name: '',
        fullname: '',
        phonenumber: '',
        adress: '',
        email: '',
        count_place: 0,
        type_org: '',
        type_city: '',
        type_ecolog: '',
        latitude: 0,
        longitude: 0
    };
    id_req: string = '';
    req: any;
    myMap: any;
    selectposition = false;
    oblasttypes: any = [];
    regiontypes: any = [];
    orgOptions = [
        { label: 'Частный', value: 'pr' },
        { label: 'Государственный', value: 'gos' }
    ];

    cityOptions = [
        { label: 'Город', value: 'gor' },
        { label: 'Село', value: 'selo' }
    ];

    ecologOptions = [
        { label: 'Обычный', value: 'normal' },
        { label: 'В зоне радиации', value: 'rad' },
        { label: 'В зоне экологии', value: 'eco' }
    ];


    ngOnInit() {

        this.id_req = this.reqelementconfig.data.id;

        if (this.id_req == '') {
            this.messageServicereq.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            return
        }

        this.httpservice
            .getrequestelement(this.id_req)
            .subscribe(
                (data) => { this.req = data, this.request = this.req[0], this.initMap(), this.getoblast(), this.getregion() });
    }

    initMap(): void {

        let map = new ymaps.Map('map', {
            center: [this.request.latitude, this.request.longitude],
            zoom: 13
        });

        this.myMap = map;
        // Сравним положение, вычисленное по ip пользователя и
        // положение, вычисленное средствами браузера.
        // geolocation.get({
        //     provider: 'yandex',
        //     mapStateAutoApply: true
        // }).then(function (result) {
        //     // Красным цветом пометим положение, вычисленное через ip.
        //     result.geoObjects.options.set('preset', 'islands#redIcon');

        //     result.geoObjects.get(0).properties.set({
        //         balloonContentBody: 'Ваше местоположение'
        //     });
        //     map.geoObjects.add(result.geoObjects);
        // });

        map.geoObjects
            .add(new ymaps.Placemark([this.request.latitude, this.request.longitude], {
                balloonContent: 'Ваше местоположение'
            }, {
                preset: 'islands#redIcon',
                iconColor: '#0095b6'
            }))

        map.events.add('click', (event) => {
            let coordinat = event.get('coords');
            this.request.latitude = coordinat[0];
            this.request.longitude = coordinat[1];
            this.selectposition = true;

            map.geoObjects.removeAll()
                .add(new ymaps.Placemark([this.request.latitude, this.request.longitude], {
                    balloonContent: 'Местоположение организации',
                    openEmptyBalloon: true
                }, {
                    preset: 'islands#redIcon',
                    iconColor: '#0095b6'
                }))

        });
    }

    getoblast() {
        if (this.oblasttypes.length == 0) {
            this.httpservice
                .getoblasttype()
                .subscribe(
                    (data) => (
                        this.oblasttypes = data
                    ),
                    (error) => (this.messageServicereq.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }

    changeobl() {
        this.regiontypes.splice(0);
        this.request.id_region = '';
    }

    getregion() {
        if (this.regiontypes.length == 0) {
            this.httpservice
                .getregiontype(this.request.id_obl)
                .subscribe(
                    (data) => (
                        this.regiontypes = data
                    ),
                    (error) => (this.messageServicereq.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }

    changeregion() {
        let kat = this.regiontypes.filter((obj: any) => { return obj.id_region === this.request.id_region });
        this.request.latitude = Number(kat[0].latitude);
        this.request.longitude = Number(kat[0].longitude);

        this.myMap.destroy();
        this.initMap();

    }

    positiveRequest() {
        let mass = [this.request]
        this.httpservice
            .notification(mass, true)
            .subscribe(
                (data) => (this.childelementref.close(true), this.messageServicereq.add({ severity: 'success', summary: 'Успешно', detail: 'Заявка одобрена' })),
                (error) => (this.messageServicereq.add({ severity: 'error', summary: 'Ошибка', detail: error.error.message })));

    }

    NegativeRequest() {
        let mass = [this.request]
        this.httpservice
            .notification(mass, false)
            .subscribe(
                (data) => (this.childelementref.close(true), this.messageServicereq.add({ severity: 'success', summary: 'Успешно', detail: 'Заявка отклонена' })),
                (error) => (this.messageServicereq.add({ severity: 'error', summary: 'Ошибка', detail: error.error.message })));

    }

    close() {
        this.childelementref.close(false);
    }

}