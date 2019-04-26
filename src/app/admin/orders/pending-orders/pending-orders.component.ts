import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit, OnDestroy {

  pendingOrders: Order[];

  pendSub;
  pend1Sub;

  showSpinner: boolean = true;

  today = new Date().toISOString();

  constructor(private orderService: OrdersService) { }

  ngOnInit() {

    this.orderService.getPendingOrders();

    this.pendSub = this.orderService._pendingOrders.subscribe((orders) => {
      this.showSpinner = false;
      this.pendingOrders = orders;
    });

  }

  ngOnDestroy() {
    this.pendSub.unsubscribe();
  }

  checkOrder(order: Order) {
    if(new Date(order.pickupDate).getTime() > new Date().getTime()){
      return false;
    } else {
      return true;
    }
  }

  orderPickup(order: Order) {
    this.orderService.orderPickedup(order);
  }
  orderCancel(order: Order) {
    this.orderService.orderCancelled(order);
  }
}
