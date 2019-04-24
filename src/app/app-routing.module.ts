import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';
import { PendingOrdersComponent } from './admin/orders/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './admin/orders/completed-orders/completed-orders.component';
import { AllOrdersComponent } from './admin/orders/all-orders/all-orders.component';
import { CancelledOrdersComponent } from './admin/orders/cancelled-orders/cancelled-orders.component';
import { PickedupOrdersComponent } from './admin/orders/pickedup-orders/pickedup-orders.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
        children: [
          { path: 'pending-orders', component: PendingOrdersComponent },
          { path: 'completed-orders', component: CompletedOrdersComponent },
          { path: 'all-orders', component: AllOrdersComponent },
          { path: 'cancelled-orders', component: CancelledOrdersComponent },
          { path: 'pickedup-orders', component: PickedupOrdersComponent },
          { path: '', redirectTo: 'pending-orders', pathMatch: 'full' }
        ]
      },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'orders', pathMatch: 'full' }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule]
})
export class AppRoutingModule {}
