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
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { CartComponent } from './pages/products/cart/cart.component';

import { TenderComponent } from './pages/tenders/tender/tender.component';
import { BidsListComponent } from './pages/products/bids-list/bids-list.component';
import { BidDetailComponent } from './pages/products/bid-detail/bid-detail.component';
import { OrgBidsComponent } from './pages/products/org-bids/org-bids.component';
import { OrgProductsComponent } from './pages/products/org-products/org-products.component';
import { ShipmentComponent } from './pages/products/shipment/shipment.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'tender', component: TendersComponent},
  {path: 'tender/:id', component: TenderComponent},
  {path: 'delivery-information', component: DeliveryInformationComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-conditions', component: TermsConditionsComponent},
  {path: 'contact-us', component: ContactsComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'service-providers', children: [
                        
                        // {path:'provider-details', component: ProviderDetailsComponent}

                                  ]
},
  {path:'services/:id', component: ProvidersComponent},
  {path:'service-providers/:id', component: ProviderDetailsComponent},
  {path:'products/:id', component: ProductsListComponent},
  {path:'product/:id', component: ProductDetailComponent},
  {path:'bids/:id', component: BidsListComponent},
  {path:'bid/:id', component: BidDetailComponent},
  {path:'organisation/bids/:id', component: OrgBidsComponent},
  {path:'organisation/products/:id', component: OrgProductsComponent},
  {path:'cart', component: CartComponent},
  {path:'shipment/:id', component: ShipmentComponent},
  
  {
    path: 'myaccount', children: [
                            {path:'', component: DashboardComponent, canActivate: [AuthGuard] },
                            {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
                            {path:'orders', component: OrdersComponent, canActivate: [AuthGuard]},
                            {path:'track-my-orders', component: TrackMyOrdersComponent,canActivate: [AuthGuard]},
                            {path:'bids', component: BidsComponent, canActivate: [AuthGuard]},
                            {path:'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
                            {path:'appointments', component: AppointmentsComponent, canActivate: [AuthGuard]},
                            {path:'quotations', component: QuotationsComponent, canActivate: [AuthGuard]},
                            {path:'reffered-clients', component: RefferedClientsComponent, canActivate: [AuthGuard]},
                            {path:'address', component: AddressComponent, canActivate: [AuthGuard]},
                            {path:'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]}

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
