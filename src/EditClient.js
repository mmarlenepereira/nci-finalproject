import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/clients/${id}`);
        const clientData = response.data;
        setFirstName(clientData.first_name);
        setLastName(clientData.last_name);
        setPhoneNumber(clientData.phone_number);
        setEmail(clientData.email);
        setAddress(clientData.address);
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred. Please refresh the page and try again.');
      }
    };

    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (firstName.trim() === '') {
      validationErrors.firstName = 'First Name is required';
    }
    if (lastName.trim() === '') {
      validationErrors.lastName = 'Last Name is required';
    }
    if (phoneNumber.trim() === '') {
      validationErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^[0-9+]{7,10}$/.test(phoneNumber)) {  // checks the format of the phone number, can only include digits (0-10), must contain between 7 and 10 digitals, and may include the character '+'
      validationErrors.phoneNumber = 'Phone Number format is invalid';
    }

    if (email.trim() === '') {
      validationErrors.email = 'Email is required';
    }
    if (address.trim() === '') {
      validationErrors.address = 'Address is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:3000/clients/${id}`, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        address,
      });

      console.log(response.data);
      navigate(`/clients/${id}`);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const duplicateField = error.response.data.field;
        setErrorMessage(
          'Inserted values correspond to another client. Please ensure the phone number and email addresses are unique to each client'
        );
      } else {
        console.error(error);
        setErrorMessage('An error occurred. Please refresh the page and try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate(`/clients/${id}`);
  };

  return (
    <div className="container">
      <h2>Update Customer Details</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {errors.address && <div className="text-danger">{errors.address}</div>}
        </div>
        <button type="submit" className="btn btn-primary me-2">Save changes</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditClient;









