import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { AdminModule } from '@app/modules/admin/admin.module';
import { CoreModule } from '@core/core.module';
import { NavbarComponent } from '@core/navbar/navbar.component';
import { AuthorizationInterceptor } from '@core/providers/authorization.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { HistoryComponent } from './modules/admin/history/history.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';
import { ResultComponent } from './modules/admin/result/result.component';
import { HomeComponent } from './modules/public/home/home.component';
import { PublicModule } from './modules/public/public.module';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    ProfileComponent,
    ResultComponent,
    HistoryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
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
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

