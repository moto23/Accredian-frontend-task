import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components';
import Navbar from './Navbar';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
  
  padding: 10px;
  margin-top: -40px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 50px;
  }
`;

const LoginForm = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  margin: 60px 20px;
  flex: 1;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: black;
  }

  p {
    margin-bottom: 20px;
    color: black;
  }

  .form-group {
    margin-bottom: 20px;
    color: black;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input[type="email"],
    .password-input-container input {
      width: 93%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
    }

    .password-input-container {
      display: flex;
      align-items: center;
      position: relative;

      input {
        flex: 1;
        padding-right: 40px;
      }

      .password-toggle-icon {
        position: absolute;
        right: 10px;
        cursor: pointer;
        color: #4b0082;
      }
    }

    .forgot-password {
      display: block;
      margin-top: 5px;
      text-align: center;
      color: blue;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .login-button {
    width: 100%;
    padding: 10px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: blue;
    }
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
`;

const LoginImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  img {
    max-height: 70vh;
    width: auto;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    order: 2;
    margin-top: 20px;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      setEmailError(value.includes('@') ? '' : 'Enter a valid email');
    }

    if (name === 'password') {
      setPasswordError(value.length >= 6 ? '' : 'Enter a valid password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }

    try {
      // Simulate login logic for demonstration
      console.log('Logging in with:', formData);
      navigate('/'); // Redirect to the main page after login
    } catch (error) {
      setError('Something went wrong');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
        <Navbar />

    <LoginContainer>
      <LoginImage>
        <img src="https://accounts.pwskills.com/images/signin-banner.svg" alt="Login" />
      </LoginImage>
      <LoginForm>
        <h2>Login</h2>
        <p>Don't have an account yet? <Link to="/register">Sign Up</Link></p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              onChange={handleChange}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter 6 characters or more"
                required
                onChange={handleChange}
              />
              <span className="password-toggle-icon" onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && <p className="error">{passwordError}</p>}
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">LOGIN</button>
        </form>
      </LoginForm>
    </LoginContainer>
    </>
  );
};

export default Login;
