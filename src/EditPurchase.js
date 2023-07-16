import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPurchase() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('Waiting Confirmation');
  const [paymentTerms, setPaymentTerms] = useState('100% upfront');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [quantity, setQuantity] = useState(1); // Add quantity state with a default value

  useEffect(() => {
    // Fetch the purchase data by ID
    const fetchPurchase = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/purchases/${id}`);
        const purchase = response.data;

        setProductName(purchase.product_name);
        setDescription(purchase.description);
        setPrice(String(purchase.price));
        setQuantity(purchase.quantity); // Newly added column (post all config). Set the quantity value. Total will be automatically calcyl
        setDeliveryDate(purchase.delivery_date);
        setImage(purchase.image);
        setStatus(purchase.status);
        setPaymentTerms(purchase.payment_terms);
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred. Please refresh the page and try again.');
      }
    };

    fetchPurchase();
  }, [id]);

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
    }
    if (deliveryDate.trim() === '') {
      validationErrors.deliveryDate = 'Delivery Date is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Price validation: must be a number
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
      validationErrors.price = 'Price must be a number';
    }

    // Delivery date validation: delivery date must be in the future except when the status is Complete
    const currentDate = new Date().toISOString().split('T')[0];
    if (status !== 'Complete' && deliveryDate < currentDate) {
      validationErrors.deliveryDate = 'Delivery Date must be in the future';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    //put request
    try {
      const response = await axios.put(`http://localhost:3000/purchases/${id}`, {
        product_name: productName,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity), // Newly added field. Total will be calculated based on price and quantity
        total: parseFloat(price) * parseInt(quantity), // Calculate the total
        delivery_date: deliveryDate,
        image,
        status,
        payment_terms: paymentTerms
      });

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
      <h2>Update Order Details </h2>
      <br></br>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <p></p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          {errors.productName && <div className="text-danger">{errors.productName}</div>}
        </div>
        <p></p>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <div className="text-danger">{errors.description}</div>}
        </div>
        <p></p>
        <div className="form-group">
          <label>Price (EUR):</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.price && <div className="text-danger">{errors.price}</div>}
        </div>
        <p></p>
        <div className="form-group">
          <label>Quantity:</label>
          <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          required
          />
        </div>
        <p></p>
        <div className="form-group">
          <label>Delivery Date:</label>
          <input
            type="date"
            className="form-control"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
          {errors.deliveryDate && <div className="text-danger">{errors.deliveryDate}</div>}
        </div>
        <p></p>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <p></p>
        <div className="form-group">
          <label>Payment Terms:</label>
          <div>
            <input
              type="radio"
              id="upfront"
              name="paymentTerms"
              value="100% upfront"
              checked={paymentTerms === '100% upfront'}
              onChange={(e) => setPaymentTerms(e.target.value)}
              required
            />
            <label htmlFor="upfront">100% upfront</label>
          </div>
          <div>
            <input
              type="radio"
              id="split"
              name="paymentTerms"
              value="50%-50%"
              checked={paymentTerms === '50%-50%'}
              onChange={(e) => setPaymentTerms(e.target.value)}
              required
            />
            <label htmlFor="split">50%-50%</label>
          </div>
          <div>
            <input
              type="radio"
              id="completion"
              name="paymentTerms"
              value="100% upon completion"
              checked={paymentTerms === '100% upon completion'}
              onChange={(e) => setPaymentTerms(e.target.value)}
              required
            />
            <label htmlFor="completion">100% upon completion</label>
          </div>
          <p></p>
        <div className="form-group">
          <label>Status:</label>
          <div>
            <input
              type="radio"
              id="waitingConfirmation"
              name="status"
              value="Waiting Confirmation"
              checked={status === 'Waiting Confirmation'}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            <label htmlFor="waitingConfirmation">Waiting Confirmation</label>
          </div>
          <div>
            <input
              type="radio"
              id="inProgress"
              name="status"
              value="In-Progress"
              checked={status === 'In-Progress'}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            <label htmlFor="inProgress">In-Progress</label>
          </div>
          <div>
            <input
              type="radio"
              id="complete"
              name="status"
              value="Complete"
              checked={status === 'Complete'}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            <label htmlFor="complete">Complete</label>
          </div>
        </div>
          <p></p>
        </div>
        <div className="form-group">
        <button type="submit" className="btn btn-primary me-2">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPurchase;

