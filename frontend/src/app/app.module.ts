import { NgModule, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProtectedModule } from '@app/modules/protected/protected.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './modules/protected/dashboard/dashboard.component';
import { HistoryComponent } from './modules/protected/history/history.component';
import { ResultComponent } from './modules/protected/result/result.component';
import { HomeComponent } from './modules/public/home/home.component';
import { CoreModule } from '@core/core.module';
import { PublicModule } from './modules/public/public.module';
import { SharedModule } from './modules/shared/shared.module';
import { NavbarComponent } from '@core/navbar/navbar.component';
import { ProfileComponent } from './modules/protected/profile/profile.component';

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
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatProgressBarModule,
    MatSelectModule,
    CoreModule,
    SharedModule,
    PublicModule,
    ProtectedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

