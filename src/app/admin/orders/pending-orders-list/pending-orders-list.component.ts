import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-pending-orders-list',
  templateUrl: './pending-orders-list.component.html',
  styleUrls: ['./pending-orders-list.component.css']
})
export class PendingOrdersListComponent implements OnInit {

  orders: Order[];

  showSpinner: boolean = true;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getOutstandingOrders().then(orders => {
      this.orders = orders;
      this.showSpinner = false;
    });
  }
}
