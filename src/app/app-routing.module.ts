import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { PagesComponent } from './pages/pages.component';
import { ConfigurationComponent } from './pages/profile/configuration/configuration.component';
import { GeneralInfoComponent } from './pages/profile/general-info/general-info.component';
import { LocationComponent } from './pages/profile/location/location.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'general-info', component: GeneralInfoComponent },
          { path: 'location', component: LocationComponent },
          { path: 'configuration', component: ConfigurationComponent}
        ],
      },
      { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: '**', component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
