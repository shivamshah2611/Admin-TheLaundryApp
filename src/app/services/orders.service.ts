import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

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
  _pickedupOrders = new Subject<Order[]>();

  constructor(private afstore: AngularFirestore) {}

  async getCompletedOrders() {
    this.completedOrders = [];

    var db = this.afstore.firestore
      .collection('orders')
      .where('payStatus', '==' , 'Received');

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

  async getPendingOrders() {
    this.pendingOrders = [];

    var db = this.afstore.firestore
      .collection('orders')
      .where('orderStatus', '==' , 'pending');

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

        this.pendingOrders.sort((a,b) => {
          return new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime();
        })
        console.log(this.pendingOrders);
        return this.pendingOrders;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  async getCancelledOrders() {
    this.cancelledOrders = [];

    var db = this.afstore.firestore
      .collection('orders').where('payStatus', '==' , 'Cancelled');

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

        this.cancelledOrders.sort((a,b) => {
          return new Date(b.orderCreateddate).getTime() - new Date(a.orderCreateddate).getTime();
        })

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

    var db = this.afstore.firestore
      .collection('orders');

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
        this.orders.sort((a,b) => {
          return new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime();
        })
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
      .collection('orders').where('orderStatus', '==', 'Picked Up');

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
        this.pickedupOrders.sort((a,b) => {
          return new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime();
        })
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
      }).then(() => {

        this.removeByAttr(this.pendingOrders,'id',order.id);

        this._pickedupOrders.next(this.pendingOrders);
        console.log('updated order status!')
      }).catch((err) => {
        console.log(err)
      });

    }

    removeByAttr = function(arr, attr, value){
      var i = arr.length;
      while(i--){
         if( arr[i]
             && arr[i].hasOwnProperty(attr)
             && (arguments.length > 2 && arr[i][attr] === value ) ){

             arr.splice(i,1);

         }
      }
      return arr;
  }
}
