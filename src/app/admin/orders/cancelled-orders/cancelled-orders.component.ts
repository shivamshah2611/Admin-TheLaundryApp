import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cancelled-orders',
  templateUrl: './cancelled-orders.component.html',
  styleUrls: ['./cancelled-orders.component.css']
})
export class CancelledOrdersComponent implements OnInit {

  cancelledOrders: Order[];

  showSpinner: boolean = true;

  constructor(private orderService: OrdersService) { }

  ngOnInit() {
    this.orderService.getCancelledOrders().then(cancOrders => {
      this.cancelledOrders = cancOrders;
      this.showSpinner = false;
    });
  }

}
