import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { FireSQL } from 'firesql';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private completedOrders: Order[];

  private pendingOrders: Order[];
  _pendingOrders = new Subject<Order[]>();

  private cancelledOrders: Order[];

  private orders: Order[];

  private pickedupOrders: Order[];
  public _pickedupOrders = new Subject<Order[]>();

  removeByAttr = function(arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        (arguments.length > 2 && arr[i][attr] === value)
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  constructor(private afstore: AngularFirestore) {}

  async getCompletedOrders() {
    this.completedOrders = [];

    var db = this.afstore.firestore
      .collection('orders')
      .where('payStatus', '==', 'Received');

    return await db
      .get()
      .then(orders => {
        orders.forEach(order => {
          this.completedOrders.push(
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
        console.log(this.completedOrders);
        return this.completedOrders;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  async getPendingOrdersSync() {
    this.pendingOrders = [];

    var db = this.afstore.firestore
      .collection('orders')
      .where('orderStatus', '==', 'pending');

    return await db
      .get()
      .then(orders => {
        orders.forEach(order => {
          this.pendingOrders.push(
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

        this.pendingOrders.sort((a, b) => {
          return (
            new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime()
          );
        });
        console.log(this.pendingOrders);
        return this.pendingOrders;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  async getPendingOrders() {
    this.pendingOrders = [];
    let newOrder;
    var db = this.afstore.firestore
      .collection('orders')
      .where('orderStatus', '==', 'pending');

    await db.onSnapshot(order => {
      order.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log(change.doc.data());
          newOrder = new Order(
            change.doc.id,
            change.doc.data().userId,
            change.doc.data().noOfGarments,
            change.doc.data().services,
            change.doc.data().amount,
            change.doc.data().address,
            change.doc.data().pincode,
            change.doc.data().orderCreatedDate,
            change.doc.data().pickupDate,
            change.doc.data().pickupTimeslot,
            change.doc.data().deliveryDate,
            change.doc.data().orderStatus,
            change.doc.data().payStatus
          );
          this.pendingOrders.push(newOrder);
          this.pendingOrders.sort((a, b) => {
            return (
              new Date(a.pickupDate).getTime() -
              new Date(b.pickupDate).getTime()
            );
          });
        }
      });

      this._pendingOrders.next(this.pendingOrders);
    });
  }

  async getCancelledOrders() {
    this.cancelledOrders = [];

    var db = this.afstore.firestore
      .collection('orders')
      .where('payStatus', '==', 'Cancelled');

    return await db
      .get()
      .then(orders => {
        orders.forEach(order => {
          this.cancelledOrders.push(
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

        this.cancelledOrders.sort((a, b) => {
          if (
            new Date(b.orderCreateddate).getTime() >
            new Date(a.orderCreateddate).getTime()
          )
            return 1;
          if (
            new Date(b.orderCreateddate).getTime() <
            new Date(a.orderCreateddate).getTime()
          )
            return -1;

          if (
            new Date(a.pickupDate).getTime() < new Date(b.pickupDate).getTime()
          )
            return 1;
          if (
            new Date(a.pickupDate).getTime() > new Date(b.pickupDate).getTime()
          )
            return -1;
        });

        console.log(this.cancelledOrders);
        return this.cancelledOrders;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  async getAllOrders() {
    this.orders = [];

    var db = this.afstore.firestore.collection('orders');

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
        this.orders.sort((a, b) => {
          if (
            new Date(b.orderCreateddate).getTime() >
            new Date(a.orderCreateddate).getTime()
          )
            return 1;
          if (
            new Date(b.orderCreateddate).getTime() <
            new Date(a.orderCreateddate).getTime()
          )
            return -1;

          if (
            new Date(a.pickupDate).getTime() < new Date(b.pickupDate).getTime()
          )
            return 1;
          if (
            new Date(a.pickupDate).getTime() > new Date(b.pickupDate).getTime()
          )
            return -1;
        });
        console.log(this.orders);
        return this.orders;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  async getPickedupOrders() {
    this.pickedupOrders = [];

    var db = this.afstore.firestore
      .collection('orders')
      .where('orderStatus', '==', 'Picked Up');

    return await db
      .get()
      .then(orders => {
        orders.forEach(order => {
          this.pickedupOrders.push(
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
        this.pickedupOrders.sort((a, b) => {
          return (
            new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime()
          );
        });
        console.log(this.pickedupOrders);
        return this.pickedupOrders;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  async orderPickedup(order: Order) {
    var db = this.afstore.firestore.doc(`orders/${order.id}`);

    db.update({
      orderStatus: 'Picked Up'
    })
      .then(() => {
        this.removeByAttr(this.pendingOrders, 'id', order.id);

        this._pendingOrders.next(this.pendingOrders);
        console.log('updated order status!');
      })
      .catch(err => {
        console.log(err);
      });
  }

  async orderCancelled(order: Order) {
    var db = this.afstore.firestore.doc(`orders/${order.id}`);

    db.update({
      payStatus: 'Cancelled',
      deliveryDate: 'Cancelled',
      orderStatus: 'Order cancelled on:' + new Date().toDateString()
    })
      .then(() => {
        this.removeByAttr(this.pendingOrders, 'id', order.id);

        this._pendingOrders.next(this.pendingOrders);
        console.log('updated order status!');
      })
      .catch(err => {
        console.log(err);
      });
  }

  async orderCompleted(order: Order) {
    var db = this.afstore.firestore.doc(`orders/${order.id}`);

    db.update({
      payStatus: 'Received',
      deliveryDate: 'Order Delivered on: ' + new Date().toDateString(),
      orderStatus: 'Delivered'
    })
      .then(() => {
        this.removeByAttr(this.pickedupOrders, 'id', order.id);

        this._pickedupOrders.next(this.pickedupOrders);
        console.log('updated order status!');
      })
      .catch(err => {
        console.log(err);
      });
  }

  async getOrdersCount() {
    await this.getCompletedOrders();
    await this.getCancelledOrders();
    await this.getPendingOrdersSync();
    await this.getPickedupOrders();

    let count = {
      completedOrders: this.completedOrders.length,
      cancelledOrders: this.cancelledOrders.length,
      pendingOrders: this.pendingOrders.length,
      pickedupOrders: this.pickedupOrders.length
    };
    console.log(count);
    return count;
  }

  async getPincodeAnalytics() {
    var db = this.afstore.firestore;
    const fireSQL = new FireSQL(db);
    return await fireSQL.query('select pincode,AVG(amount) as avgAmount from orders group by pincode').then(doc => {
      return  doc;
    });
  }
  async getOrderCreatedSumAnalyticsLimit() {
    var db = this.afstore.firestore;
    const fireSQL = new FireSQL(db);
    return await fireSQL.query('select orderCreatedDate,SUM(amount) as sumAmount from orders group by orderCreatedDate').then(doc => {
      doc.sort((a,b) => {
        return new Date(a.orderCreatedDate).getTime() - new Date(b.orderCreatedDate).getTime()
      })

      return doc.slice(-10,doc.length);
    });
  }

  async getOrderCreatedSumAnalyticsAll() {
    var db = this.afstore.firestore;
    const fireSQL = new FireSQL(db);
    return await fireSQL.query('select orderCreatedDate,SUM(amount) as sumAmount from orders group by orderCreatedDate').then(doc => {
      doc.sort((a,b) => {
        return new Date(a.orderCreatedDate).getTime() - new Date(b.orderCreatedDate).getTime()
      })

      return doc;
    });
  }
}
