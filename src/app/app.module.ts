import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './mat.module'
import { HttpClientModule } from "@angular/common/http";

import { orglistComponent } from './adminpanel/organization/organization-list';
import { orgselectComponent } from './adminpanel/organization/organization-select';
import { organizationelementComponent } from './adminpanel/organization/organization-element';
import { grouplistComponent } from './dirs/group/gruoplist.component';
import { groupelementComponent } from './dirs/group/groupelement.component';
import { groupselectComponent } from './dirs/group/groupselect';
import { childlistComponent } from './dirs/child/childlist';
import { childelementComponent } from './dirs/child/childelement';
import { childselectComponent } from './dirs/child/childselect';
import { metodistlistComponent } from './dirs/metodist/metodistlist';
import { metodistelementComponent } from './dirs/metodist/metodistelement';
import { metodistselectComponent } from './dirs/metodist/metodistselect';
import { visitchildComponent } from './reports/visitschild/visitchild';
import { planComponent } from './reports/dnevnoiplan/plan.component';
import { changepasswordComponent } from './dirs/changepassword/password.component';
import { tablechildComponent } from './reports/tabelchild/tablechild';
import { registrationComponent } from './main/registration/registration.component';
import { requestlistComponent } from './dirs/request/requestlist.component';
import { requestelementComponent } from './dirs/request/requestelement.component';
import { RecaptchaModule } from "ng-recaptcha";
import { NgxCaptchaModule } from 'ngx-captcha';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { NgxCurrencyModule } from 'ngx-currency';






import { firstpagelementComponent } from './reports/startpage/startpage.component';
import { uploadComponent } from './dirs/upload/upload.component';
import { AppComponent } from './app.component';
import { NgChartsModule } from 'ng2-charts';
import { MainComponent, SpaceSeparatorPipe } from './main/maincomponent/main.component';
import { AdminPanelComponent } from './adminpanel/AdminPanel/adminpanel';
import { childlistAdmComponent } from './adminpanel/listsforadmin/childlist';
import { metodistlistadminComponent } from './adminpanel/listsforadmin/metodistlist';
import { grouplistadmComponent } from './adminpanel/listsforadmin/gruoplist.component';
import { StartPageAdminComponent } from './adminpanel/startpage/startpage.component';
import { SubOrgDetail } from './adminpanel/suborganization/suborg';
import { SublistComponent } from './adminpanel/suborganization/sub-list';

import { DashboardComponent } from './dashboard/dashboard/dashboard.component'


import { authComponent } from './main/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';

import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { PasswordModule } from 'primeng/password';
import { DockModule } from 'primeng/dock';
import { ImageModule } from 'primeng/image';
import { GMapModule } from 'primeng/gmap';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DragDropModule } from 'primeng/dragdrop';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TreeTableModule } from 'primeng/treetable';
import { GalleriaModule } from 'primeng/galleria';
import { SharedModule } from 'primeng/api';


import { DiagramComponent } from './dashboard/diagram/diagram.component';
import { FakeComponent } from './adminpanel/fake-component/fake-component';
import { PriceserviceComponent } from './adminpanel/priceservice/priceservice-list/priceservice.component';
import { PriceserviceDetailComponent } from './adminpanel/priceservice/priceservice-detail/priceservice-detail.component';





// const mapConfig: YaConfig = {

//   apikey: 'd5a0151a-a231-4e97-88b8-ea415ce931ff',
//   lang: 'ru_RU'
// };

@NgModule({
  imports: [
    // AngularYandexMapsModule.forRoot(mapConfig),
    AngularYandexMapsModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    MaterialModules,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule,
    InputTextModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    MessagesModule,
    TableModule,
    MenubarModule,
    PaginatorModule,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
    InputMaskModule,
    DropdownModule,
    InputSwitchModule,
    FileUploadModule,
    SplitButtonModule,
    CheckboxModule,
    AccordionModule,
    OverlayPanelModule,
    InputTextareaModule,
    DynamicDialogModule,
    ToastModule,
    TabViewModule,
    TabMenuModule,
    PasswordModule,
    DockModule,
    MenuModule,
    MessageModule,
    ImageModule,
    GMapModule,
    SelectButtonModule,
    RecaptchaModule,
    NgxCaptchaModule,
    DragDropModule,
    SkeletonModule,
    ContextMenuModule,
    TreeTableModule,
    GalleriaModule,
    SharedModule,],
  declarations: [
    AppComponent,
    authComponent,
    MainComponent,
    AdminPanelComponent,
    StartPageAdminComponent,
    childlistAdmComponent,
    metodistlistadminComponent,
    grouplistadmComponent,
    SubOrgDetail,
    SublistComponent,
    grouplistComponent,
    orglistComponent,
    organizationelementComponent,
    orgselectComponent,
    DashboardComponent,
    DiagramComponent,
    groupelementComponent,
    groupselectComponent,
    childlistComponent,
    childselectComponent,
    childelementComponent,
    metodistlistComponent,
    metodistelementComponent,
    metodistselectComponent,
    visitchildComponent,
    planComponent,
    changepasswordComponent,
    tablechildComponent,
    registrationComponent,
    requestlistComponent,
    requestelementComponent,
    firstpagelementComponent,
    uploadComponent,
    FakeComponent,
    PriceserviceComponent,
    PriceserviceDetailComponent,
    SpaceSeparatorPipe],
  bootstrap: [AppComponent],
  providers: [MessageService, ConfirmationService]
})
export class AppModule { }
