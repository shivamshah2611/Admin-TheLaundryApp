import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders: Order[];

  constructor(private afstore: AngularFirestore) {}

  async getOutstandingOrders() {
    this.orders = [];

    var db = this.afstore.firestore
      .collection('orders')
      .where('pickupDate', '>=', new Date().toISOString()).where('orderStatus', '==' , 'pending');

    return await db
      .get()
      .then(orders => {
        orders.forEach(order => {
          this.orders.push(
            new Order(
              order.id,
              order.data().userId,
              order.data().noOfGarments,
              order.data().services,
              order.data().amount,
              order.data().address,
              order.data().pincode,
              order.data().orderCreatedDate,
              order.data().pickupDate,
              order.data().pickupTimeslot,
              order.data().deliveryDate,
              order.data().orderStatus,
              order.data().payStatus
            )
          );
        });
        console.log(this.orders);
        return this.orders;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}
