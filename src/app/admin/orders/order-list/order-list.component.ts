import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../../../services/orders.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[];

  showSpinner: boolean;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.showSpinner = true;
    this.orderService.fetchAllOrders().then(orders => {
      this.orders = orders;
      this.showSpinner = false;
      console.log(this.orders);
    }, err =>{
      console.log(err);
    });


  }

}
