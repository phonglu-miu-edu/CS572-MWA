import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '@app/modules/admin/admin.component';
import { HorseComponent } from '@app/modules/admin/horse/horse.component';
import { JockeyComponent } from '@app/modules/admin/jockey/jockey.component';
import { RaceComponent } from '@app/modules/admin/race/race.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';
import { HomeComponent } from './modules/public/home/home.component';
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
      { path: 'profile', component: ProfileComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'race', component: RaceComponent },
      { path: 'horse', component: HorseComponent },
      { path: 'jockey', component: JockeyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
