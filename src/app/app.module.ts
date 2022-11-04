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
    FeaturedProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
