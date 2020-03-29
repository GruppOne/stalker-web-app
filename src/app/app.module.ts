import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/_routes/home/home.component';
import {LoginComponent} from './components/_routes/login/login.component';
import {ButtonConfirmComponent} from './components/button-confirm/button-confirm.component';
import {FormEmailComponent} from './components/form-email/form-email.component';
import {FormPasswordComponent} from './components/form-password/form-password.component';
import {CustomMaterialModule} from './modules/material.module';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Stalker - Login'}},
  {path: 'home', component: HomeComponent, data: {title: 'Stalker - Home'}},
  {path: 'profile', component: ProfileComponent, data: {title: 'Stalker - Profile'}},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FormEmailComponent,
    FormPasswordComponent,
    ButtonConfirmComponent,
    ProfileComponent,
  ],
  imports: [
    CustomMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled'}),
    HttpClientModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
