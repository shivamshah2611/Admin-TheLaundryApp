import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-pickedup-orders',
  templateUrl: './pickedup-orders.component.html',
  styleUrls: ['./pickedup-orders.component.css']
})
export class PickedupOrdersComponent implements OnInit, OnDestroy {


  pickupOrders: Order[];

  pickupSub;

  showSpinner: boolean = true;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getPickedupOrders().then(orders => {
      this.pickupOrders = orders;
      this.showSpinner = false;
    });

    this.pickupSub = this.orderService._pickedupOrders.subscribe(orders => {
      this.pickupOrders = orders;
    });
  }

  ngOnDestroy(): void {
    this.pickupSub.unsubscribe();
  }

  orderComplete(order) {
    this.orderService.orderCompleted(order);
  }
}
