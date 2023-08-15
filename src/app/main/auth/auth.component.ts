import { Component, HostListener } from "@angular/core";
import { Router } from '@angular/router';
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { HttpService } from '../../http.service';
import { changepasswordComponent } from '../../dirs/changepassword/password.component';
import { registrationComponent } from '../registration/registration.component';
import { throwError, timer } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';


@Component({
  selector: 'auth-element',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})


export class authComponent {

  constructor(private router: Router,
    private httpservice: HttpService,
    private messageServiceChangePass: MessageService,
    public ChangePassref: DynamicDialogRef,
    public dialogServiceChangePass: DialogService) { }

  login = "";
  pass = "";
  result: any = [];
  loading: boolean = false;
  res: any;

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.checkAuth()
  }

  checkAuth() {
    this.loading = true;
    this.httpservice
      .authuser(this.login, this.pass)
      .pipe(
        timeout(5000), // установка таймаута на 5 секунд
        catchError(error => {
          if (error.name === 'TimeoutError') {
            this.loading = false;
            this.messageServiceChangePass.add({ severity: 'error', summary: 'Ошибка', detail: 'Время ожидания истекло. Попробуйте позднее!' });
          }
          else {
            this.loading = false;
            this.messageServiceChangePass.add({ severity: 'error', summary: 'Ошибка', detail: 'Авторизация неуспешна!' });
          }
          return throwError('Произошла ошибка: ' + error.message);
        })
      )
      .subscribe(
        (data) => (
          this.res = data,
          this.result[0] = this.res,
          this.loading = true,
          sessionStorage.setItem("token", 'Basic ' + btoa(unescape(encodeURIComponent(this.login + ":" + this.pass)))),
          this.openDialog()
        )
      )
  }

  registration() {
    this.ChangePassref = this.dialogServiceChangePass.open(registrationComponent,
      {
        header: 'Регистрация нового пользователя',
        width: 'calc(50%)',
        height: 'calc(100%)'
      });

    this.ChangePassref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.messageServiceChangePass.add({ severity: 'success', summary: 'Успешно', detail: 'Спасибо за регистарцию, в ближайшее время с Вами свяжутся по указанному номеру телефона!' })
      }
    });
  }

  openDialog() {
    if (this.result[0].change_pass == "True") {
      this.ChangePassref = this.dialogServiceChangePass.open(changepasswordComponent,
        {
          header: 'Изменение пароля пользователя',
          width: 'calc(40%)',
          height: 'calc(40%)',
          closable: false
        });

      this.ChangePassref.onClose.subscribe(() => {
        this.messageServiceChangePass.add({ severity: 'success', summary: 'Успешно', detail: 'Пароль изменен! Войдите, пожалуйста, в систему!' }),
          this.router.navigate(['login'])
      });
    }
    else {
      if (this.result[0].is_admin == "True") {
        this.router.navigate(['admin'])
      }
      else {
        this.router.navigate([''])
      }
    }

  }
}
