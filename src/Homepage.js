//Homepage works as entry point for the navigation, and it also works as an admin dashboard, with the key-metrics for Customers and Orders.

import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Timeline from './Timeline'; // Import the Timeline component
//import './Timeline'; // This was causing errors: it was importing the Timeline component as a default export, but I was trying to use it as a named import.

function Homepage() {
  const [totalClients, setTotalClients] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/clients')
      .then((response) => {
        setTotalClients(response.data.clients.length);
      })
      .catch((error) => {
        console.error('Error fetching total customers:', error);
      });

    axios
      .get('http://localhost:3000/purchases')
      .then((response) => {
        setOrderData(response.data);
        setTotalOrders(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching total orders:', error);
      });
  }, []);

  const getOrderDataByStatus = () => {
    const orderStatusCounts = {};

    for (const order of orderData) {
      const status = order.status;
      if (orderStatusCounts[status]) {
        orderStatusCounts[status] += 1;
      } else {
        orderStatusCounts[status] = 1;
      }
    }

    return orderStatusCounts;
  };

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Orders by Status',
    },
    colors: ['#9E7E61', '#C1A87B', '#BFA693', '#A3998D'], //palette of earth colors
    series: [
      {
        name: 'Status',
        data: Object.entries(getOrderDataByStatus()).map(([status, count]) => ({
          name: status,
          y: count,
        })),
      },
    ],
  };

  //render visual elements
  return (
    <div className="container">
      <br />
      <h2>
        <i>The Potter's App</i>: Business Made Easy
      </h2>
      <br />
      <div className="row">
        <div className="col-md-6">  {/* Render the Scorecard: Clients*/}
          <h2>Clients</h2>
          <div className="card">
            <div className="card-body">
              <h3>Total Clients: {totalClients}</h3>
              <Link to="/clients" className="btn btn-primary">
                View Clients
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6"> {/* Render the Scorecard: Purchases*/}
          <h2>Orders</h2>
          <div className="card">
            <div className="card-body">
              <h3>Total Orders: {totalOrders}</h3>
              <Link to="/purchases" className="btn btn-primary">
                View Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
     <div className="row mt-4">  {/* Render the Piechart 'Orders by Status */}
        <div className="col-md-6">
          <h2>Orders by Status</h2>
          <div className="card">
            <div className="card-body">
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6"> {/* Render the Timeline chart Orders by Delivery Date*/}
          <h2>Order Timeline</h2>
          <div className="card">
            <div className="card-body">
              <Timeline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
