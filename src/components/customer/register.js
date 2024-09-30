import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [data, setdata] = useState({
    user_fname: '',
    user_lname: '',
    user_phone: '',
    user_email: '',
    user_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('http://127.0.0.1:8000/customer/customer_create_account/', data)
      .then((response) => {
        setSuccessMessage('Registration successful!');
        setLoading(false);
        console.log(response.data.status);
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        setError('Failed to register');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="register-container text-center bg-primary">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="user_fname"
            value={data.user_fname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="user_lname"
            value={data.user_lname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="number"
            name="user_phone"
            value={data.user_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="user_email"
            value={data.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="user_password"
            value={data.user_password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading} className='btn btn-warning mt-3'>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
export default Register;
