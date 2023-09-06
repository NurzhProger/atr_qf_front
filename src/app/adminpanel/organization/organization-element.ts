import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from '../../http.service';
import { orguser } from '../../interfaces';

declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'org-element',
    templateUrl: './organization-element.html'
})


export class organizationelementComponent {

    constructor(private httpservice: HttpService,
        private metodistSelectref: DynamicDialogRef,
        private childelementref: DynamicDialogRef,
        private messageServiceorg: MessageService,
        private metodistSelectdialogService: DialogService,
        private orgelementconfig: DynamicDialogConfig) { }

    orgView: orguser = {
        id: '',
        id_obl: '',
        id_region: '',
        bin: '',
        org_name: '',
        fullname: '',
        phonenumber: '',
        adress: '',
        email: '',
        latitude: 0,
        longitude: 0,
        type_org: '',
        type_city: '',
        type_ecolog: '',
        count_place: 0,
        checkedgps: ''
    };
    oblasttypes: any = [];
    regiontypes: any = [];
    id_org: string = '';
    org: any;
    myMap: any;
    selectposition = false;
    is_staff = '';
    res: any;
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

    gpsOptions = [
        { label: 'Да', value: true },
        { label: 'Нет', value: false }
    ]

    ngOnInit() {
        this.id_org = this.orgelementconfig.data.id;

        if (this.id_org == '') {
            this.messageServiceorg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' });
            return
        }

        this.httpservice
            .getorgelement(this.id_org)
            .subscribe(
                (data) => {
                    this.org = data, this.orgView = this.org[0],
                        this.initMap(),
                        this.getoblast(),
                        this.getregion()
                });

        this.httpservice
            .getinfoorg()
            .subscribe(
                (data) => (this.res = data,
                    this.is_staff = this.res.is_staff));
    }

    initMap(): void {

        let map = new ymaps.Map('map', {
            center: [this.orgView.latitude, this.orgView.longitude],
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
            .add(new ymaps.Placemark([this.orgView.latitude, this.orgView.longitude], {
                balloonContent: 'Ваше местоположение'
            }, {
                preset: 'islands#redIcon',
                iconColor: '#0095b6'
            }))

        map.events.add('click', (event) => {
            let coordinat = event.get('coords');
            this.orgView.latitude = coordinat[0];
            this.orgView.longitude = coordinat[1];
            this.selectposition = true;

            map.geoObjects.removeAll()
                .add(new ymaps.Placemark([this.orgView.latitude, this.orgView.longitude], {
                    balloonContent: 'Местоположение организации',
                    openEmptyBalloon: true
                }, {
                    preset: 'islands#redIcon',
                    iconColor: '#0095b6'
                }))

        });
    }

    saveOrg() {

        let mass = [this.orgView]
        this.httpservice
            .org_edit(mass)
            .subscribe(
                (data) => (this.childelementref.close(true), this.messageServiceorg.add({ severity: 'success', summary: 'Успешно', detail: 'Данные организации сохранены' })),
                (error) => (this.messageServiceorg.add({ severity: 'error', summary: 'Ошибка', detail: error.error.message })));

    }

    getoblast() {
        if (this.oblasttypes.length == 0) {
            this.httpservice
                .getoblasttype()
                .subscribe(
                    (data) => (
                        this.oblasttypes = data
                    ),
                    (error) => (this.messageServiceorg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }

    getregion() {
        if (this.regiontypes.length == 0) {
            this.httpservice
                .getregiontype()
                .subscribe(
                    (data) => (
                        this.regiontypes = data
                    ),
                    (error) => (this.messageServiceorg.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }

    changeregion() {
        let kat = this.regiontypes.filter((obj: any) => { return obj.id_region === this.orgView.id_region });
        this.orgView.latitude = Number(kat[0].latitude);
        this.orgView.longitude = Number(kat[0].longitude);

        this.myMap.destroy();
        this.initMap();

    }

    changeobl() {
        this.regiontypes.splice(0);
        this.orgView.id_region = '';
    }

    close() {
        this.childelementref.close(false);
    }

}