import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../charts/canvasjs.min.js';
import { OrdersService } from './../../../services/orders.service';

@Component({
  selector: 'app-order-analytics',
  templateUrl: './order-analytics.component.html',
  styleUrls: ['./order-analytics.component.css']
})
export class OrderAnalyticsComponent implements OnInit {
  countOrders;
  showSpinner: boolean = true;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService.getOrdersCount().then(count => {
      this.countOrders = count;
      console.log(this.countOrders);
      let chart = new CanvasJS.Chart('orderContainer', {
        theme: 'light2',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Orders'
        },
        data: [
          {
            type: 'pie',
            showInLegend: true,
            toolTipContent: '<b>{name}</b>: {y} (#percent%)',
            indexLabel: '{name} - #percent%',
            dataPoints: [
              { y: this.countOrders.completedOrders, name: 'Completed Orders' },
              { y: this.countOrders.cancelledOrders, name: 'Cancelled Orders' },
              { y: this.countOrders.pendingOrders, name: 'Pending Orders' },
              { y: this.countOrders.pickedupOrders, name: 'Picked up Orders' }
            ]
          }
        ]
      });
      this.showSpinner = false;
      chart.render();
    });

    this.ordersService.getPincodeAnalytics().then(avgAmount => {
      let dataPoints = [];
      console.log(avgAmount);
      avgAmount.forEach(element => {
        dataPoints.push({ y: element.avgAmount, label: element.pincode });
      });

      let chart = new CanvasJS.Chart('avgAmountContainer', {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Average Amount Spent from Different Pincodes'
        },
        data: [
          {
            toolTipContent: '<b>{label}</b>: ₹{y}',
            type: 'column',
            dataPoints: dataPoints
          }
        ]
      });
      chart.render();
    });

    this.ordersService.getOrderCreatedSumAnalyticsLimit().then(sumAmountDate => {
      console.log(sumAmountDate);
      let dataPoints = [];
      sumAmountDate.forEach(sumAmount => {
        dataPoints.push({ y: sumAmount.sumAmount , label: sumAmount.orderCreatedDate});
      })


      let chart = new CanvasJS.Chart('dateWiseContainerLimit', {
        zoomEnabled: true,
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Sum of Amount Spend for last 10 days'
        },
        data: [
          {
            toolTipContent: '<b>{label}</b>: ₹{y}',
            type: 'line',
            dataPoints: dataPoints
          }
        ]
      });

      chart.render();
    });

    this.ordersService.getOrderCreatedSumAnalyticsAll().then(sumAmountDate => {
      console.log(sumAmountDate);
      let dataPoints = [];
      sumAmountDate.forEach(sumAmount => {
        dataPoints.push({ y: sumAmount.sumAmount , label: sumAmount.orderCreatedDate});
      })


      let chart = new CanvasJS.Chart('dateWiseContainerAll', {
        zoomEnabled: true,
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Sum of Amount Spend'
        },
        data: [
          {
            toolTipContent: '<b>{label}</b>: ₹{y}',
            type: 'line',
            dataPoints: dataPoints
          }
        ]
      });

      chart.render();
    });
  }
}
