import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@app/modules/admin/admin.component';
import { JockeyComponent } from '@app/modules/admin/jockey/jockey.component';
import { CheckTokenGuard } from '@core/guards/check-token.guard';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { HistoryComponent } from './modules/admin/history/history.component';
import { ResultComponent } from './modules/admin/result/result.component';
import { HomeComponent } from './modules/public/home/home.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';
import { LoginComponent } from './modules/public/login/login.component';
import { RegisterComponent } from './modules/public/register/register.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path:  'admin',  component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'jockey', component: JockeyComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'result', component: ResultComponent },
      { path: 'history', component: HistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
