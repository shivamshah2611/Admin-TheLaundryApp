import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { digest } from '@angular/compiler/src/i18n/serializers/xmb';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders: Order[];

  constructor(private afstore: AngularFirestore) {}

  async fetchAllOrders() : Promise<Order[]> {
    this.orders = [];

    var db = this.afstore.firestore.collection('users');

    return new Promise((resolve, reject) => {
      db.get()
        .then(users => {
          users.forEach(async user => {
            await db
              .doc(user.id)
              .collection('orders')
              .get()
              .then(async orders => {
                await orders.forEach(order => {
                  this.orders.push(
                    new Order(
                      order.id,
                      order.data().noOfGarments,
                      order.data().services,
                      order.data().amount,
                      order.data().address,
                      order.data().pincode,
                      order.data().orderCreatedDate,
                      order.data().pickupDate,
                      order.data().pickupTimeslot,
                      order.data().orderStatus,
                      order.data().payStatus
                    )
                  );
                });
              });
          });

          this.orders.sort((a, b) => {
            return b.orderCreateddate.localeCompare(a.orderCreateddate);
          });

          console.log(this.orders);
          resolve(this.orders);
        })
        .catch(err => {
          console.log('error:' + err);
          reject(err);
        });
    });
  }
}
