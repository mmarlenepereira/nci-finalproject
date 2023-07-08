import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function NewClient() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post('http://127.0.0.1:3000/clients', {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        address,
      });
      console.log(response.data);
      navigate('/clients');
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please refresh the page and try again.');
    }
  };

  const handleCancel = () => {
    navigate(`/clients`);
  };

  return (
    <div className="container">
      <h2>Add New Client</h2>
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
        <button type="submit" className="btn btn-primary me-2">Add Client</button> {/* me-2 adds a small margin to the right side of the button. This will create a slight separation between the two buttons. */}
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default NewClient;








