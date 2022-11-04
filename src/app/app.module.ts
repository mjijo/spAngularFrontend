import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
