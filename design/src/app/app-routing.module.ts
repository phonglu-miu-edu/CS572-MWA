import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { DashhomeComponent } from './dashboard/dashhome/dashhome.component';
import { ResultComponent } from './dashboard/result/result.component';
import { HistoryComponent } from './dashboard/history/history.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent,
children:[
{
  path:'profile',
  component:ProfileComponent
},
{
  path:'',
  component:DashhomeComponent
},
{
  path:'result',
  component:ResultComponent
},
{
  path:'history',
  component:HistoryComponent
}
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
