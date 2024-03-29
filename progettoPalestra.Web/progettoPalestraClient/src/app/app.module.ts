import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, Inject } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { PpBreadcrumbsModule } from 'pp-breadcrumbs';

// Form
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

// Import components
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../modules/shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { TestComponent } from './components/test-component/test-component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';

// Import per la localizzazione
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { AvatarModule } from 'ngx-avatar';
import { ToastrModule } from 'ngx-toastr';
import { ListNotificationsComponent } from './components/notifications/list-notifications/list-notifications.component';
import { PendingChangesGuard } from './helpers/componentDeactivate.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListArticleComponent } from './components/article/list-article/list-article.component';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import { HomeComponent } from './components/public/home/home.component';
import { NavigationComponent } from './components/public/navigation/navigation.component';
import { ArticleCardsComponent } from './components/public/article-cards/article-cards.component';
import { ArticleCardComponent } from './components/public/article-card/article-card.component';
import { CartComponent } from './components/public/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { DetailsOrderComponent } from './components/order/details-order/details-order.component';
import { StatisticOrderComponent } from './components/order/statistic-order/statistic-order.component';

registerLocaleData(localeIt, 'it-IT');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    HttpClientModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    SharedModule.forRoot(),
    PpBreadcrumbsModule,
    AvatarModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,
    ForgotComponent,
    ErrorComponent,
    ProfileComponent,
    ChangePasswordComponent,
    TestComponent,
    ListNotificationsComponent,
    ListCategoryComponent,
    AddCategoryComponent,
    ListArticleComponent,
    AddArticleComponent,
    HomeComponent,
    NavigationComponent,
    ArticleCardsComponent,
    ArticleCardComponent,
    CartComponent,
    CheckoutComponent,
    ListOrderComponent,
    DetailsOrderComponent,
    StatisticOrderComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    { provide: LOCALE_ID, useValue: 'it-IT' },
    PendingChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
}

export let InjectorInstance: Injector;
