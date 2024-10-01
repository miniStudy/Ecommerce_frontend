import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library

function Login() {
  const [data, setData] = useState({
    user_email: '',
    user_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked); // Update the Remember Me state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('http://127.0.0.1:8000/customer/customer_login/', data)
      .then((response) => {
        if (response.data.status) {
          // Store session information based on Remember Me checkbox
          if (rememberMe) {
            // Store in cookies if Remember Me is checked
            Cookies.set('customer_id', response.data.customer_id, { expires: 7 }); // Cookie expires in 7 days
            Cookies.set('customer_fname', response.data.customer_fname, { expires: 7 });
            Cookies.set('customer_logged_in', 'yes', { expires: 7 });
          } else {
            // Store in local storage if Remember Me is not checked
            localStorage.setItem('customer_id', response.data.customer_id);
            localStorage.setItem('customer_fname', response.data.customer_fname);
            localStorage.setItem('customer_logged_in', 'yes');
          }

          setSuccessMessage('Login successful!');
          setLoading(false);
          // Redirect to a different page if needed (e.g., dashboard)
          // window.location.href = '/dashboard'; // Uncomment to redirect
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setError('Email Id or Password does not match');
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
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
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
        <div>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleCheckboxChange}
          />
          <label>Remember Me</label>
        </div>
        <button type="submit" disabled={loading} className='btn btn-warning mt-3'>
          {loading ? 'Login...' : 'Login'}
        </button>
      </form>
      <Link to="/customer/register">Don't have an account? Register here</Link>
    </div>
  );
}

export default Login;
