import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';

function NewPurchase() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const clientIdParam = searchParams.get('clientId');
    setClientId(clientIdParam);
  }, [location.search]);

  const [clientId, setClientId] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('Waiting Confirmation'); // default value from enumeration list
  const [paymentTerms, setPaymentTerms] = useState('100% upfront'); // default value from enumeration list
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  //Validation Errors
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (productName.trim() === '') {
      validationErrors.productName = 'Product Name is required';
    }
    if (description.trim() === '') {
      validationErrors.description = 'Description is required';
    }
    if (price.trim() === '') {
      validationErrors.price = 'Price is required';
    } else {
      const priceRegex = /^\d+(\.\d{1,2})?$/; // regex that determines the format accepted by this field: contains only numbers, whole numbers or floating numbers with one or two decimals
      if (!priceRegex.test(price)) {
        validationErrors.price = 'Price must be a number';
      }
    }
    if (deliveryDate.trim() === '') {
      validationErrors.deliveryDate = 'Delivery Date is required';
    } else {
      const currentDate = new Date().toISOString().split('T')[0];
      if (status !== 'Complete' && deliveryDate < currentDate) {
        validationErrors.deliveryDate = 'Delivery Date must be in the future';
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/purchases', {
        product_name: productName,
        description,
        price: parseFloat(price),
        delivery_date: deliveryDate,
        client_id: parseInt(clientId),
        image,
        status,
        payment_terms: paymentTerms,
      });

      const purchase = response.data;

      const clientResponse = await axios.get(`http://localhost:3000/clients/${clientId}`);
      const client = clientResponse.data;

      const updatedClient = { ...client, order_count: client.order_count + 1 };

      await axios.put(`http://localhost:3000/clients/${clientId}`, updatedClient);

      console.log(response.data);
      navigate('/purchases');
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please refresh the page and try again.');
    }
  };

  const handleCancel = () => {
    navigate('/purchases');
  };

  return (
    <div className="container">
      <h2>New Order for Customer # {clientId}</h2>
      <br></br>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          {errors.productName && <div className="text-danger">{errors.productName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <div className="text-danger">{errors.description}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.price && <div className="text-danger">{errors.price}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="deliveryDate" className="form-label">Delivery Date:</label>
          <input
            type="date"
            className="form-control"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
          {errors.deliveryDate && <div className="text-danger">{errors.deliveryDate}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input
            type="text"
            className="form-control"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="waitingConfirmation"
                name="status"
                value="Waiting Confirmation"
                checked={status === 'Waiting Confirmation'}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor="waitingConfirmation">Waiting Confirmation</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="inProgress"
                name="status"
                value="In-Progress"
                checked={status === 'In-Progress'}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor="inProgress">In-Progress</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="complete"
                name="status"
                value="Complete"
                checked={status === 'Complete'}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor="complete">Complete</label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="paymentTerms" className="form-label">Payment Terms:</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="upfront"
                name="paymentTerms"
                value="100% upfront"
                checked={paymentTerms === '100% upfront'}
                onChange={(e) => setPaymentTerms(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor="upfront">100% upfront</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="split"
                name="paymentTerms"
                value="50%-50%"
                checked={paymentTerms === '50%-50%'}
                onChange={(e) => setPaymentTerms(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor="split">50%-50%</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                id="completion"
                name="paymentTerms"
                value="100% upon completion"
                checked={paymentTerms === '100% upon completion'}
                onChange={(e) => setPaymentTerms(e.target.value)}
                required
              />
              <label className="form-check-label" htmlFor="completion">100% upon completion</label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary me-3">Save New Order</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default NewPurchase;









