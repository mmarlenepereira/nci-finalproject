import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function PurchaseRecord() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/purchases/${id}`);
        setPurchase(response.data); // Set the response data as the purchase
      } catch (error) {
        console.error(error);
      }
    };

    fetchPurchase();
  }, [id]);

  const deletePurchase = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Order? This action is irreversible!'
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/purchases/${id}`)
        .then(() => {
          alert('Order successfully deleted');
          setTimeout(() => {
            navigate('/purchases');
          }, 1000); // Delay of 1 second: message is displayed and only then the user is directed to the list of orders
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (!purchase) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Order #{id}</h2>
      <br></br>
      <h5>
        Customer:{' '}
        <Link to={`/clients/${purchase.client.id}`}>
          {purchase.client.first_name} {purchase.client.last_name}
        </Link>
      </h5>
      <p></p>
      <p><b>Product Name:</b> {purchase.product_name}</p>
      <p><b>Description:</b> {purchase.description}</p>
      <p><b>Inspiration Image:</b> <a href={purchase.image}>{purchase.image}</a></p>
      <p><b>Price (EUR):</b> {purchase.price}</p>
      <p><b>Quantity:</b> {purchase.quantity}</p>
      <p><b>Total:</b> {purchase.total}</p>
      <p><b>Payment Terms:</b> {purchase.payment_terms}</p>
      <p><b>Order Date:</b> {purchase.created_at}</p>
      <p><b>Delivery Date:</b> {purchase.delivery_date}</p>
      <p><b>Status:</b>  {purchase.status}</p>

      <div className="row mt-3">
        <div className="col">
        <Link to="/purchases" className="btn btn-secondary me-3">
            Back to List of Orders
          </Link>
          <Link to={`/edit-purchase/${id}`} className="btn btn-primary me-3">
            Edit Order
          </Link>
          <button onClick={deletePurchase} className="btn btn-danger">
            Delete Order
          </button>

        </div>
      </div>
    </div>
  );
}

export default PurchaseRecord;







