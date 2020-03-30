import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {ButtonConfirmComponent} from './button-confirm/button-confirm.component';
import {CustomMaterialModule} from './core/material.module';
import {FormEmailComponent} from './form-email/form-email.component';
import {FormPasswordComponent} from './form-password/form-password.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {HttpStalkerService} from './services/http-stalker.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FormEmailComponent,
    FormPasswordComponent,
    ButtonConfirmComponent,
  ],
  imports: [
    CustomMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled'}),
    HttpClientModule,
  ],
  providers: [HttpStalkerService, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
