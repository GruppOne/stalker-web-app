import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/_routes/home/home.component';
import {LoginComponent} from './components/_routes/login/login.component';
import {ProfileComponent} from './components/_routes/profile/profile.component';
import {ButtonConfirmComponent} from './components/button-confirm/button-confirm.component';
import {FormEmailComponent} from './components/form-email/form-email.component';
import {FormPasswordComponent} from './components/form-password/form-password.component';
import {EditOrganizationComponent} from './edit-organization/edit-organization.component';
import {CustomMaterialModule} from './modules/material.module';
import {OrganizationComponent} from './organization/organization.component';
import {PlaceComponent} from './place/place.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Stalker - Login'}},
  {path: 'home', component: HomeComponent, data: {title: 'Stalker - Home'}},
  {path: 'profile', component: ProfileComponent},
  {
    path: 'organization',
    component: OrganizationComponent,
  },
  {path: 'place', component: PlaceComponent},
  {
    path: 'edit-organization',
    component: EditOrganizationComponent,
  },
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
    OrganizationComponent,
    PlaceComponent,
    EditOrganizationComponent,
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
