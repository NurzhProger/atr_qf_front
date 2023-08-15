import { Component } from "@angular/core";
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
registerLocaleData(localeRu, 'ru');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService, DialogService, DynamicDialogRef,]
})



export class AppComponent {
  constructor(private config: PrimeNGConfig) { }

  ngOnInit() {
    this.config.setTranslation({
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      monthNamesShort: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      firstDayOfWeek: 1
    })
  }
}
