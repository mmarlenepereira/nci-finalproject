// displays a list of customers with ascending and descending sorting for the table headers:
//import Navbar from './Navbar';
//import Footer from './Footer';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3000/clients')
      .then((response) => {
        setClients(response.data.clients);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    if (sortColumn === 'id') {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    } else if (sortColumn === 'first_name') {
      return sortOrder === 'asc'
        ? a.first_name.localeCompare(b.first_name)
        : b.first_name.localeCompare(a.first_name);
    } else if (sortColumn === 'last_name') {
      return sortOrder === 'asc'
        ? a.last_name.localeCompare(b.last_name)
        : b.last_name.localeCompare(a.last_name);
    } else if (sortColumn === 'phone_number') {
      return sortOrder === 'asc'
        ? a.phone_number.localeCompare(b.phone_number)
        : b.phone_number.localeCompare(a.phone_number);
    } else if (sortColumn === 'email') {
      return sortOrder === 'asc'
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (sortColumn === 'order_count') {
      return sortOrder === 'asc' ? a.order_count - b.order_count : b.order_count - a.order_count;
    }
    return 0;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Customers</h1>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortColumn === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('first_name')}>
              First Name {sortColumn === 'first_name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('last_name')}>
              Last Name {sortColumn === 'last_name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('phone_number')}>
              Phone Number {sortColumn === 'phone_number' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortColumn === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('order_count')}>
              Order Count {sortColumn === 'order_count' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <tr key={client.id}>
              <td>
                <Link to={`/clients/${client.id}`}>{client.id}</Link>
              </td>
              <td>{client.first_name}</td>
              <td>{client.last_name}</td>
              <td>{client.phone_number}</td>
              <td>{client.email}</td>
              <td>
                <Link to={`/purchases?clientId=${client.id}`}>{client.order_count}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/new-client">
        <button className="btn btn-primary">Create New Client</button>
      </Link>
    </div>
  );
}

export default Clients;


