/*Displays all details for the specific Client.
Allows the user to Edit the record, and create child records on the Purchase table.
Allows the user to delete the Client record and any related records on the Purchases table.
Before deletion, requests double-confirmation. If deletion is successful, a confirmation message (alert) "Client was deleted" is displayed and there will be a 1-second delay before the redirect to the Clients page. */

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClientRecord() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/clients/${id}`);
        setClient(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClient();
  }, [id]);

  const destroyClient = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this record? This action is irreversible!'
    );

    if (confirmDelete) {
      axios
        .delete(`http://127.0.0.1:3000/clients/${id}`)
        .then(() => {
          alert('Client was deleted');
          setTimeout(() => {
            navigate('/clients');
          }, 1000); // Delay of 1 second (can be adjusted)

          // Fetch the updated client data after deletion
          axios.get(`http://127.0.0.1:3000/clients/${id}`)
            .then((response) => {
              setClient(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container"> {/* Apply the 'container' class for responsive layout */}
      <h2>Customer #{id}</h2>
      <br></br>
      <p><b>First Name:</b> {client.first_name}</p>
      <p><b>Last Name:</b> {client.last_name}</p>
      <p><b>Phone Number:</b> {client.phone_number}</p>
      <p><b>Email:</b> {client.email}</p>
      <p><b>Address:</b> {client.address}</p>
      <br></br>
      <h5>Total Orders placed by {client.first_name} {client.last_name}:  {client.order_count}</h5>
      <p>
        <Link to={`/purchases?clientId=${id}`}> <b>View Orders</b></Link>
      </p>
      <p>
        <Link to={`/new-purchase?clientId=${id}`} className="btn btn-primary me-2">New Order</Link> {/* Apply the 'btn' and 'btn-primary' classes for button styling */}
        <Link to={`/edit-client/${id}`} className="btn btn-primary me-2">Edit Customer</Link> {/* Apply the 'btn' and 'btn-primary' classes for button styling */}
      <button onClick={destroyClient} className="btn btn-danger">Delete Customer</button> {/* Apply the 'btn' and 'btn-danger' classes for button styling */}
      {message && <p>{message}</p>} </p>
    </div>
  );
}

export default ClientRecord;




