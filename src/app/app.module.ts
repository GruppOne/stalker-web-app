import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {FormEmailComponent} from './form-email/form-email.component';
import {FormPasswordComponent} from './form-password/form-password.component';
import {ButtonConfirmComponent} from './button-confirm/button-confirm.component';
import {HttpStalkerService} from './http-stalker.service/http-stalker.service';
import {CustomMaterialModule} from './core/material.module';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Login - Stalker'}},
  {path: 'home', component: HomeComponent, data: {title: 'Home - Stalker'}},
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
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [HttpStalkerService, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
