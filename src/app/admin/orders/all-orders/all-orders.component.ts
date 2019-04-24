import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders: Order[];

  showSpinner: boolean = true;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getAllOrders().then(orders => {
      this.orders = orders;
      this.showSpinner = false;
    });
  }

}
