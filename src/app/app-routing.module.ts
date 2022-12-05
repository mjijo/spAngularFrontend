import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './helpers'

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
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DeliveryInformationComponent } from './pages/delivery-information/delivery-information.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { FeaturesComponent } from './pages/features/features.component';
import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TendersComponent } from './pages/tenders/tenders.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { ProviderDetailsComponent } from './pages/service-providers/provider-details/provider-details.component';
import { ProvidersComponent } from './pages/service-providers/providers/providers.component';
import { IndividualRegistrationComponent } from './auth/individual-registration/individual-registration.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'tender', component: TendersComponent},
  {path: 'delivery-information', component: DeliveryInformationComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-conditions', component: TermsConditionsComponent},
  {path: 'contact-us', component: ContactsComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'service-providers', children: [
                        
                        // {path:'provider-details', component: ProviderDetailsComponent}

                                  ]
},
  {path:'providers', component: ProvidersComponent},
  {path:'service-providers/:slug', component: ProviderDetailsComponent} ,
  {
    path: 'myaccount', children: [
                            {path:'', component: DashboardComponent, canActivate: [AuthGuard] },
                            {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
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
  {path: 'register-organization', component: RegisterComponent},
  {path: 'register', component: IndividualRegistrationComponent},


  { path: '**', redirectTo: 'home' }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
