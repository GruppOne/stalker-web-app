import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';

import {AppComponent} from './app.component';
import {EditOrganizationComponent} from './components/_routes/edit-organization/edit-organization.component';
import {HomeComponent} from './components/_routes/home/home.component';
import {LoginComponent} from './components/_routes/login/login.component';
import {OrganizationComponent} from './components/_routes/organization/organization.component';
import {ProfileComponent} from './components/_routes/profile/profile.component';
import {ButtonConfirmComponent} from './components/button-confirm/button-confirm.component';
import {FormEmailComponent} from './components/form-email/form-email.component';
import {FormPasswordComponent} from './components/form-password/form-password.component';
import {MapComponent} from './components/map/map.component';
import {CustomMaterialModule} from './modules/material.module';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {title: 'Stalker - Login'}},
  {path: 'home', component: HomeComponent, data: {title: 'Stalker - Home'}},
  {path: 'profile', component: ProfileComponent},
  {
    path: 'organization',
    component: OrganizationComponent,
  },
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
    EditOrganizationComponent,
    MapComponent,
  ],
  imports: [
    CustomMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes, {anchorScrolling: 'enabled'}),
    HttpClientModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
