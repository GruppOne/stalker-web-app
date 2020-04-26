import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';

import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
import {AuthHttpInterceptorService} from './model/services/auth-http-interceptor.service';
import {CustomMaterialModule} from './modules/material.module';
import {EditOrganizationComponent} from './view/_routes/edit-organization/edit-organization.component';
import {HomeComponent} from './view/_routes/home/home.component';
import {NotFoundComponent} from './view/_routes/not-found/not-found.component';
import {OrganizationComponent} from './view/_routes/organization/organization.component';
import {OrganizationsComponent} from './view/_routes/organizations/organizations.component';
import {ProfileComponent} from './view/_routes/profile/profile.component';
import {ButtonConfirmComponent} from './view/components/button-confirm/button-confirm.component';
import {FormEmailComponent} from './view/components/form-email/form-email.component';
import {FormPasswordComponent} from './view/components/form-password/form-password.component';
import {MapComponent} from './view/components/map/map.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
    data: {title: 'Stalker - Home'},
    canActivate: [AuthGuard],
  },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {
    path: 'organization',
    component: OrganizationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'organizations',
    component: OrganizationsComponent,
  },
  {
    path: 'editorganization',
    component: EditOrganizationComponent,
    canActivate: [AuthGuard],
  },
  // route to 404
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormEmailComponent,
    FormPasswordComponent,
    ButtonConfirmComponent,
    ProfileComponent,
    OrganizationComponent,
    EditOrganizationComponent,
    MapComponent,
    NotFoundComponent,
    OrganizationsComponent,
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
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptorService,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
