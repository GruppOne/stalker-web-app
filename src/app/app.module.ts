import {NgModule} from '@angular/core';
import {CustomMaterialModule} from './core/material.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {FormEmailComponent} from './form-email/form-email.component';
import {FormPasswordComponent} from './form-password/form-password.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Stalker - Home'}},
  {path: 'login', component: LoginComponent, data: {title: 'Stalker - Login'}},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FormEmailComponent,
    FormPasswordComponent,
  ],
  imports: [
    CustomMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
