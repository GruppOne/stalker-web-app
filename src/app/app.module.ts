import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {ChartsModule} from 'ng2-charts';
import {ColorChromeModule} from 'ngx-color/chrome';

import {AppComponent} from './app.component';
import {AuthGuard} from './auth.guard';
import {AdminType} from './model/classes/administrator';
import {AuthHttpInterceptorService} from './model/services/auth-http-interceptor.service';
import {CustomMaterialModule} from './modules/material.module';
import {CreateOrganizationComponent} from './view/_routes/create-organization/create-organization.component';
import {EditOrganizationComponent} from './view/_routes/edit-organization/edit-organization.component';
import {HomeComponent} from './view/_routes/home/home.component';
import {ListComponent} from './view/_routes/list/list.component';
import {NotFoundComponent} from './view/_routes/not-found/not-found.component';
import {OrganizationComponent} from './view/_routes/organization/organization.component';
import {OrganizationsComponent} from './view/_routes/organizations/organizations.component';
import {ProfileComponent} from './view/_routes/profile/profile.component';
import {ReportComponent} from './view/_routes/report/report.component';
import {AdministratorComponent} from './view/components/administrator/administrator.component';
import {ButtonConfirmComponent} from './view/components/button-confirm/button-confirm.component';
import {ColorPickerComponent} from './view/components/color-picker/color-picker.component';
import {ConfirmDialogComponent} from './view/components/confirm-dialog/confirm-dialog.component';
import {FormEmailComponent} from './view/components/form-email/form-email.component';
import {FormPasswordComponent} from './view/components/form-password/form-password.component';
import {InsertEmailDialogComponent} from './view/components/insert-email-dialog/insert-email-dialog.component';
import {MapComponent} from './view/components/map/map.component';
import {UsersListComponent} from './view/components/users-list/users-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    component: HomeComponent,
  },
  {path: 'user/:id', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'organizations', component: OrganizationsComponent, canActivate: [AuthGuard]},
  {
    path: 'organization/create',
    component: CreateOrganizationComponent,
    pathMatch: 'full',
  },
  {
    path: 'organization/:id',
    component: OrganizationComponent,
    canActivate: [AuthGuard],
    data: {roles: AdminType.viewer},
  },
  {
    path: 'organization/:id/edit',
    component: EditOrganizationComponent,
    canActivate: [AuthGuard],
    data: {roles: AdminType.manager},
  },
  {
    path: 'organization/:id/report',
    component: ReportComponent,
    // canActivate: [AuthGuard],
    // data: {roles: AdminType.manager},
  },
  {
    path: 'organization/:id/users',
    component: UsersListComponent,
  },
  {
    path: 'users',
    component: ListComponent,
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
    CreateOrganizationComponent,
    AdministratorComponent,
    ColorPickerComponent,
    ReportComponent,
    UsersListComponent,
    ConfirmDialogComponent,
    InsertEmailDialogComponent,
    ListComponent,
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
    ColorChromeModule,
    ChartsModule,
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
