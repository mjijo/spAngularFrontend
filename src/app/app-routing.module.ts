import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddressComponent } from './my-account/address/address.component';
import { AppointmentsComponent } from './my-account/appointments/appointments.component';
import { BidsComponent } from './my-account/bids/bids.component';
import { DashboardComponent } from './my-account/dashboard/dashboard.component';
import { MyProfileComponent } from './my-account/my-profile/my-profile.component';
import { NotificationsComponent } from './my-account/notifications/notifications.component';
import { OrdersComponent } from './my-account/orders/orders.component';
import { QuotationsComponent } from './my-account/quotations/quotations.component';
import { RefferedClientsComponent } from './my-account/reffered-clients/reffered-clients.component';
import { TrackMyOrdersComponent } from './my-account/track-my-orders/track-my-orders.component';
import { AboutComponent } from './pages/about/about.component';
import { FeaturesComponent } from './pages/features/features.component';
import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { TendersComponent } from './pages/tenders/tenders.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'tender', component: TendersComponent},

  {
    path: 'myaccount', 
     
      children: [
        {path:'', component: DashboardComponent},
        {path:'dashboard', component: DashboardComponent},
        {path:'orders', component: OrdersComponent},
        {path:'track-my-orders', component: TrackMyOrdersComponent},
        {path:'bids', component: BidsComponent},
        {path:'notifications', component: NotificationsComponent},
        {path:'appointments', component: AppointmentsComponent},
        {path:'quotations', component: QuotationsComponent},
        {path:'reffered-clients', component: RefferedClientsComponent},
        {path:'address', component: AddressComponent},
        {path:'my-profile', component: MyProfileComponent}

            ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},


  { path: '**', redirectTo: 'home' }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
