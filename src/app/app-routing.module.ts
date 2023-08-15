import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authComponent } from './main/auth/auth.component';
import { MainComponent } from './main/maincomponent/main.component';
import { AdminPanelComponent } from './adminpanel/AdminPanel/adminpanel';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: authComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
