import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '@app/modules/admin/admin.module';
import { CoreModule } from '@core/core.module';
import { CheckTokenGuard } from '@core/guards/check-token.guard';
import { NavbarComponent } from '@core/navbar/navbar.component';
import { AuthorizationInterceptor } from '@core/providers/authorization.interceptor';

import { AppComponent } from './app.component';
import { HistoryComponent } from './modules/admin/history/history.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';
import { ResultComponent } from './modules/admin/result/result.component';
import { PublicModule } from './modules/public/public.module';
import { SharedModule } from './modules/shared/shared.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/public/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/public/register/register.module').then(m => m.RegisterModule)
  },
  {
    path:  'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [CheckTokenGuard]
  },
  {
    path: '',
    loadChildren: () => import('./modules/public/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    ResultComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    CoreModule,
    SharedModule,
    PublicModule,
    AdminModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

