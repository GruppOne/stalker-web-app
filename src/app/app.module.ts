import {NgModule} from '@angular/core';
import {CustomMaterialModule} from './core/material.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {FormEmailComponent} from './form-email/form-email.component';
import {FormPasswordComponent} from './form-password/form-password.component';
import {ButtonConfirmComponent} from './button-confirm/button-confirm.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpStalker} from './http-stalker';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Stalker - Login'}},
  {path: 'home', component: HomeComponent, data: {title: 'Stalker - Home'}},
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
    // FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [HttpStalker],
  bootstrap: [AppComponent],
})
export class AppModule {}
