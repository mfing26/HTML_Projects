import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css';
import loginImage from '../assets/login.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const res = await loginUser({ email, password });
  
      alert('Logged in successfully!');
      localStorage.setItem('token', res.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
  
      window.dispatchEvent(new Event('storage'));
  
      navigate('/factors');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row p-0">
      <div className="col-md-7 d-none d-md-block p-0">
        <img
          src={loginImage}
          alt="World map with pins on it"
          className="img-fluid h-100 w-100 object-fit-cover"
        />
      </div>
      
      <div className="col-md-5 d-flex align-items-center justify-content-center p-4 bg-white">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <h1 className="mb-3">Welcome Back 👋</h1>
          <p className="mb-4 text-muted">
            Log in to continue exploring world happiness data.
          </p>
          <form onSubmit={handleLogin}> 
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            {error && <div className="text-danger mt-3">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
