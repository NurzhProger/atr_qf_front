import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {
    getData() {
        return [
            {
                itemImageSrc: 'https://face11.qazna24.kz/media/Register/100840006206_100000837_170525602102_20230518112905430500.jpg',
                thumbnailImageSrc: 'https://face11.qazna24.kz/media/Register/100840006206_100000837_170525602102_20230518112905430500.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: 'https://face11.qazna24.kz/media/Register/100840006206_100000837_170525602102_20230518112905430500.jpg',
                thumbnailImageSrc: 'https://face11.qazna24.kz/media/Register/100840006206_100000837_170525602102_20230518112905430500.jpg',
                alt: 'Description for Image 2',
                title: 'Title 2'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
};