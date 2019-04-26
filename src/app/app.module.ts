import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './admin/header/header.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { PendingOrdersComponent } from './admin/orders/pending-orders/pending-orders.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompletedOrdersComponent } from './admin/orders/completed-orders/completed-orders.component';
import { AllOrdersComponent } from './admin/orders/all-orders/all-orders.component';
import { CancelledOrdersComponent } from './admin/orders/cancelled-orders/cancelled-orders.component';

import { DropdownDirective } from './admin/directives/dropdown.directive';
import { PickedupOrdersComponent } from './admin/orders/pickedup-orders/pickedup-orders.component';
import { AnalyticsComponent } from './admin/analytics/analytics.component';
import { UserAnalyticsComponent } from './admin/analytics/user-analytics/user-analytics.component';
import { OrderAnalyticsComponent } from './admin/analytics/order-analytics/order-analytics.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    LoginComponent,
    OrdersComponent,
    UsersComponent,
    LoadingSpinnerComponent,
    PendingOrdersComponent,
    CompletedOrdersComponent,
    AllOrdersComponent,
    DropdownDirective,
    CancelledOrdersComponent,
    PickedupOrdersComponent,
    AnalyticsComponent,
    UserAnalyticsComponent,
    OrderAnalyticsComponent
  ],
  imports: [

  BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
