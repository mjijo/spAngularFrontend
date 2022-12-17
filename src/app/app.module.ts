import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { NewsletterComponent } from './layout/newsletter/newsletter.component';
import { CopyrightComponent } from './layout/copyright/copyright.component';
import { SliderComponent } from './layout/slider/slider.component';
import { FeaturedMotorSalvagesComponent } from './modules/featured-motor-salvages/featured-motor-salvages.component';
import { FeaturedAuctionsComponent } from './modules/featured-auctions/featured-auctions.component';
import { FeaturedServiceProvidersComponent } from './modules/featured-service-providers/featured-service-providers.component';
import { PartnersComponent } from './modules/partners/partners.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { TendersComponent } from './pages/tenders/tenders.component';
import { FeaturedProductsComponent } from './modules/featured-products/featured-products.component';
import { DashboardComponent } from './my-account/dashboard/dashboard.component';
import { OrdersComponent } from './my-account/orders/orders.component';
import { TrackMyOrdersComponent } from './my-account/track-my-orders/track-my-orders.component';
import { BidsComponent } from './my-account/bids/bids.component';
import { NotificationsComponent } from './my-account/notifications/notifications.component';
import { AppointmentsComponent } from './my-account/appointments/appointments.component';
import { QuotationsComponent } from './my-account/quotations/quotations.component';
import { RefferedClientsComponent } from './my-account/reffered-clients/reffered-clients.component';
import { AddressComponent } from './my-account/address/address.component';
import { MyProfileComponent } from './my-account/my-profile/my-profile.component';
import { SidemenuComponent } from './modules/sidemenu/sidemenu.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { DeliveryInformationComponent } from './pages/delivery-information/delivery-information.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { ProvidersComponent } from './pages/service-providers/providers/providers.component';
import { ProviderDetailsComponent } from './pages/service-providers/provider-details/provider-details.component';
import { IndividualRegistrationComponent } from './auth/individual-registration/individual-registration.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
import { BidDetailComponent } from './pages/products/bid-detail/bid-detail.component';
import { CartComponent } from './pages/products/cart/cart.component';
import { TenderComponent } from './pages/tenders/tender/tender.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    NewsletterComponent,
    CopyrightComponent,
    SliderComponent,
    FeaturedMotorSalvagesComponent,
    FeaturedAuctionsComponent,
    FeaturedServiceProvidersComponent,
    PartnersComponent,
    BreadcrumbComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    FeaturesComponent,
    PricingComponent,
    TendersComponent,
    FeaturedProductsComponent,
    DashboardComponent,
    OrdersComponent,
    TrackMyOrdersComponent,
    BidsComponent,
    NotificationsComponent,
    AppointmentsComponent,
    QuotationsComponent,
    RefferedClientsComponent,
    AddressComponent,
    MyProfileComponent,
    SidemenuComponent,
    MyAccountComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DeliveryInformationComponent,
    PrivacyPolicyComponent,
    FaqsComponent,
    ContactsComponent,
    TermsConditionsComponent,
    ProvidersComponent,
    ProviderDetailsComponent,
    IndividualRegistrationComponent,
    ProductsListComponent,
    ProductDetailComponent,
    BidDetailComponent,
    CartComponent,
    TenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,

  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
