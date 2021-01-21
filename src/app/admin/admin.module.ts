import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./shared/components/services/auth.service";

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SharedModule } from "../shared/components/shared.module";
import { SignupPageComponent } from './signup-page/signup-page.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/admin/login']);

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children:[
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'signup', component: SignupPageComponent},
          {path: 'login', component: LoginPageComponent },
          {path: 'create', component: CreatePageComponent, canActivate: [AngularFireAuthGuard]},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AngularFireAuthGuard]},
          {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AngularFireAuthGuard]}
        ],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService
  ]
})

export class AdminModule { }
