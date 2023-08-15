import { Component, ViewChild, OnInit, ViewContainerRef, TemplateRef } from "@angular/core";
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { HttpService } from "../../http.service";
import { changepasswordComponent } from '../../dirs/changepassword/password.component';

@Component({
  selector: 'admin-panel',
  templateUrl: './adminpanel.html',
  styleUrls: ['./adminpanel.css']
})



export class AdminPanelComponent {

  tabcount = 0;
  constructor(private router: Router,
    private httpservice: HttpService,
    private messageServiceChange: MessageService,
    private Changeref: DynamicDialogRef,
    private dialogServiceChange: DialogService) {
  }
  counttabs = 0;
  number: string = '';
  res: any;
  mass_tabs: string[] = [];
  username: string = ''
  user_org_id = ''
  user_org_name = ''
  user_id_region = 0
  editfakephoto = ''
  is_metodist = ''
  is_staff = ''

  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  viewContainerRef !: ViewContainerRef;

  @ViewChild('templateRef', { read: TemplateRef, static: true })
  templateRef !: TemplateRef<any>;

  ngOnInit() {
    let token = sessionStorage.getItem("token");

    if (!token) {
      this.router.navigate(['login']);
    }
    else {
      this.httpservice
        .getinfo()
        .subscribe(
          (data) => (
            this.res = data,
            this.username = this.res.username,
            this.editfakephoto = this.res.editfakephoto,
            this.user_org_id = this.res.user_org_id,
            this.user_org_name = this.res.user_org_name,
            this.user_id_region = parseInt(this.res.user_id_region),
            this.is_metodist = this.res.is_metodist,
            this.is_staff = this.res.is_staff,
            this.openTab("startpage-admin", "Начальная страница", '')),
          (error) => (this.router.navigate(['login']))
        )
    }
  }

  changelang(event: any) {
    localStorage.setItem("language", event.value);
  }

  openTab(nameselector: string, nametitle: string, id: string, data?: any) {
    let flag = 0;
    //Предварителная проверка существования вкладки
    this.mass_tabs.forEach((element, index) => {
      if (element == nametitle) {
        flag = index  //если открыта. то передаем индекс
      }
    });

    //если флаг больше 0, тогда открываем уже существующую, передав индекс
    if (flag > 0) {
      this.tabcount = flag
    }
    //иначе если = 0 тогда создаем новую вкладку
    else {
      this.mass_tabs.push(nametitle);
      this.number = id;
      this.viewContainerRef.createEmbeddedView(this.templateRef, { context: { selector: nameselector, title: nametitle, data: data } });
      this.counttabs++
      this.tabcount = this.counttabs - 1;
    }

  }

  changepass() {
    this.Changeref = this.dialogServiceChange.open(changepasswordComponent,
      {
        header: 'Изменение пароля пользователя',
        width: 'calc(40%)',
        height: 'calc(30%)',
        closable: true
      });

    this.Changeref.onClose.subscribe((save: boolean) => {
      if (save) {
        this.messageServiceChange.add({ severity: 'success', summary: 'Успешно', detail: 'Пароль изменен! Войдите, пожалуйста, в систему!' }),
          this.router.navigate(['login'])
      }
    })
  }

  removetab() {
    if (this.tabcount > 0) {
      this.counttabs--
      this.viewContainerRef.detach(this.tabcount)?.destroy;
      this.mass_tabs.splice(this.tabcount, 1);

    }

  }

  exit() {
    sessionStorage.removeItem("token");
    this.router.navigate(['login']);
  }

}