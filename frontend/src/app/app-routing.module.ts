import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedComponent } from '@app/modules/protected/protected.component';
import { CheckTokenGuard } from '@core/guards/check-token.guard';
import { DashboardComponent } from './modules/protected/dashboard/dashboard.component';
import { HistoryComponent } from './modules/protected/history/history.component';
import { ResultComponent } from './modules/protected/result/result.component';
import { HomeComponent } from './modules/public/home/home.component';
import { ProfileComponent } from './modules/protected/profile/profile.component';
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
    path: 'me',  component: ProtectedComponent, canActivate: [CheckTokenGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [CheckTokenGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [CheckTokenGuard] },
      { path: 'result', component: ResultComponent, canActivate: [CheckTokenGuard] },
      { path: 'history', component: HistoryComponent, canActivate: [CheckTokenGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
