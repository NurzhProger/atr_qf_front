import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpService } from '../../http.service';
import { orguser } from '../../interfaces';
import { throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

declare var myLocalStorage: any; //Локальное хранилище


@Component({
    selector: 'registration-element',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})


export class registrationComponent {

    constructor(private httpservice: HttpService,
        public metodistSelectref: DynamicDialogRef,
        public childelementref: DynamicDialogRef,
        private messageServiceadd: MessageService,
        public metodistSelectdialogService: DialogService,
        public metodistelementconfig: DynamicDialogConfig) {
    }

    metodistForm!: FormGroup;

    orguser: orguser = {
        id: '',
        id_obl: '',
        id_region: '',
        fullname: '',
        org_name: '',
        bin: '',
        phonenumber: '',
        checkedgps: '',
        adress: '',
        email: '',
        count_place: 0,
        type_org: '',
        type_city: '',
        type_ecolog: '',
        latitude: 51.128207,
        longitude: 71.430420
    };

    oblasttypes: any = [];
    regiontypes: any = [];
    secondpassword: string = '';
    changepass: boolean = false;
    selectposition: boolean = false;
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

    myMap!: any;

    ngOnInit() {
        this.metodistForm = new FormGroup({
            nameFormControl: new FormControl('', Validators.required),
            OblFormControl: new FormControl('', Validators.required),
            RegionFormControl: new FormControl('', Validators.required),
            // RegionFormControl: new FormControl({ value: '', disabled: this.regiontypes.length == 0 }, Validators.required),
            orgnameFormControl: new FormControl('', Validators.required),
            adressFormControl: new FormControl('', Validators.required),
            phoneFormControl: new FormControl('', Validators.required),
            emailFormControl: new FormControl('', [Validators.required, Validators.email]),
            IINFormControl: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(12), Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
            typeFormControl: new FormControl('', Validators.required),
            cityFormControl: new FormControl('', Validators.required),
            ecologFormControl: new FormControl('', Validators.required)
        });

        this.initMap();
        // this.getoblast();
        // this.getregion();

    }

    change(mainpassword: String) {
        if (mainpassword == '' && this.secondpassword == '') {
            this.changepass = false
        } else {
            this.changepass = mainpassword == this.secondpassword;
        }
    }

    initMap(): void {

        let map = new ymaps.Map('map', {
            center: [this.orguser.latitude, this.orguser.longitude],
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
            .add(new ymaps.Placemark([this.orguser.latitude, this.orguser.longitude], {
                balloonContent: 'Ваше местоположение'
            }, {
                preset: 'islands#redIcon',
                iconColor: '#0095b6'
            }))

        map.events.add('click', (event) => {
            let coordinat = event.get('coords');
            this.orguser.latitude = coordinat[0];
            this.orguser.longitude = coordinat[1];
            this.selectposition = true;

            map.geoObjects.removeAll()
                .add(new ymaps.Placemark([this.orguser.latitude, this.orguser.longitude], {
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
                    (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }

    changeobl() {
        this.regiontypes.splice(0)
        this.orguser.id_region = ''
    }

    getregion() {
        if (this.regiontypes.length == 0) {
            this.httpservice
                .getregiontype()
                .subscribe(
                    (data) => (
                        this.regiontypes = data
                    ),
                    (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось загрузить данные!' })));
        }
    }

    changeregion() {
        let kat = this.regiontypes.filter((obj: any) => { return obj.id_region === this.orguser.id_region });
        this.orguser.latitude = Number(kat[0].latitude);
        this.orguser.longitude = Number(kat[0].longitude);

        this.myMap.destroy();
        this.initMap();

    }

    saveRequest() {
        let mass: any;
        let rep: any;

        if (!this.selectposition) {
            this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Укажите местоположение организации!' });
            return
        }

        mass = this.orguser;
        this.httpservice
            .registration(mass)
            .pipe(
                timeout(13000),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
                    }
                    else {
                        this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status });
                    }
                    return throwError('Произошла ошибка: ' + error.message);
                })
            )
            .subscribe(
                (data) => (rep = data, this.childelementref.close(true))
                // (error) => (this.messageServiceadd.add({ severity: 'error', summary: 'Ошибка', detail: error.error.status })));
            )
    }

    close() {
        this.childelementref.close(false);
    }

}