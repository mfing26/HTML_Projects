import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { registerUser } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/index.css'; 
import registerImage from '../assets/register.png';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ email, password });
      alert('Registered successfully!');
      console.log(res);

      navigate('/login'); 
    } catch (err) {
      alert(`Registration failed: ${err.message}`);
      console.error(err.message);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column flex-md-row p-0">
      <div className="col-md-7 d-none d-md-block p-0">
        <img
          src={registerImage}
          alt="Signs showing a number of cities"
          className="img-fluid h-100 w-100 object-fit-cover"
        />
      </div>

      <div className="col-md-5 d-flex align-items-center justify-content-center p-4 bg-white">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <h1 className="mb-3">Join Us Today 🎉</h1>
          <p className="mb-4 text-muted">
            Create an account to start exploring the details into world's happiness rankings.
          </p>
          <form onSubmit={handleRegister}>
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
