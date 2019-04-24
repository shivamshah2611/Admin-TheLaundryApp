import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { UsersComponent } from './admin/users/users.component';
import { PendingOrdersListComponent } from './admin/orders/pending-orders-list/pending-orders-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
        children: [
          { path: 'pending-order-list', component: PendingOrdersListComponent },
          { path: '', redirectTo: 'pending-order-list', pathMatch: 'full' }
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
