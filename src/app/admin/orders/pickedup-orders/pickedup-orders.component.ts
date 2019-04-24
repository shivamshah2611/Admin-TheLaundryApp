import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-pickedup-orders',
  templateUrl: './pickedup-orders.component.html',
  styleUrls: ['./pickedup-orders.component.css']
})
export class PickedupOrdersComponent implements OnInit {

  pickupOrders: Order[];

  showSpinner: boolean = true;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getPickedupOrders().then(orders => {
      this.pickupOrders = orders;
      this.showSpinner = false;
    });
  }
}
