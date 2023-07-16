/* List of all orders. List can be sorted by column, in ascending and descending order.

Expected behaviour:
if the user accesses the page http://localhost:3001/purchases directly, they get a lit of all purchases
If the user is directed to the purchases page from the Order Count link, in the Client Record, the list of Purchases will be filtered by Client Id
(same applies if the user adds as query parameter to the URL based on Id: http://localhost:3001/purchases?clientId=12*/


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

// State variables sortColumn and sortOrder keep track of the currently sorted column and sort order.
function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clientId = queryParams.get('clientId');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        let url = 'http://127.0.0.1:3000/purchases';
        if (clientId) {
          url += `?clientId=${clientId}`;
        }
        const response = await axios.get(url);
        const updatedPurchases = response.data.map((purchase) => ({
          ...purchase,
          quantity: purchase.quantity,
          total: purchase.total,
        }));
        setPurchases(updatedPurchases);
      } catch (error) {
        console.error(error);
      }
    };


    fetchPurchases();
  }, [clientId]);

    // HandleSort function handles the sorting logic based on the clicked column header.
    const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedPurchases = [...purchases].sort((a, b) => {
    if (sortColumn === 'id') {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    } else if (sortColumn === 'client_name') {
      const clientNameA = `${a.client.first_name} ${a.client.last_name}`;
      const clientNameB = `${b.client.first_name} ${b.client.last_name}`;
      return sortOrder === 'asc' ? clientNameA.localeCompare(clientNameB) : clientNameB.localeCompare(clientNameA);
    } else if (sortColumn === 'product_name') {
      return sortOrder === 'asc'
        ? a.product_name.localeCompare(b.product_name)
        : b.product_name.localeCompare(a.product_name);
    } else if (sortColumn === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortColumn === 'quantity') {
      return sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    } else if (sortColumn === 'total') {
      return sortOrder === 'asc' ? a.total - b.total : b.total - a.total;
    } else if (sortColumn === 'payment_terms') {
      return sortOrder === 'asc'
        ? a.payment_terms.localeCompare(b.payment_terms)
        : b.payment_terms.localeCompare(a.payment_terms);
    } else if (sortColumn === 'delivery_date') {
      return sortOrder === 'asc'
        ? a.delivery_date.localeCompare(b.delivery_date)
        : b.delivery_date.localeCompare(a.delivery_date);
    } else if (sortColumn === 'status') {
      return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    }
    return 0;
  });





    // HandleSort function handles the sorting logic based on the clicked column header.
  return (
    <div className="container">
      <h1>Orders</h1>
      <br></br>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortColumn === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('client_name')}>
              Customer Name {sortColumn === 'client_name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('product_name')}>
              Product Name {sortColumn === 'product_name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('price')}>
              Price (EUR) {sortColumn === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('quantity')}>
              Quantity {sortColumn === 'quantity' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('total')}>
                Total (EUR) {sortColumn === 'total' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
            <th onClick={() => handleSort('payment_terms')}>
              Payment Terms {sortColumn === 'payment_terms' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('delivery_date')}>
              Delivery Date {sortColumn === 'delivery_date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('status')}>
              Status {sortColumn === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPurchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>
                <Link to={`/purchases/${purchase.id}`}>{purchase.id}</Link>
              </td>
              <td>{`${purchase.client.first_name} ${purchase.client.last_name}`}</td>
              <td>{purchase.product_name}</td>
              <td>{purchase.price}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.total}</td>
              <td>{purchase.payment_terms}</td>
              <td>{purchase.delivery_date}</td>
              <td>{purchase.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Purchases;



