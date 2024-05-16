import React, { useState } from 'react';
import axios from 'axios';
import './EmpLogin.css'; // Import the CSS file
import loginBG from '../../images/loginBG.png'; // Import the loginBG image file
import loginBG2 from '../../images/daluhenabg.png'; // Import the loginBG image file
import userNameIcon from '../../images/Icons/userName.png'; // Import the username icon
import passwordIcon from '../../images/Icons/password.png'; // Import the password icon

function EmpLogin() {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [usernameIconVisible, setUsernameIconVisible] = useState(true);
  const [passwordIconVisible, setPasswordIconVisible] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Event handler for username change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError('');
    setUsernameIconVisible(e.target.value === '');
  };

  // Event handler for password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setPasswordIconVisible(e.target.value === '');
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      setUsernameError('Please enter your username.');
      return;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }
    try {
      const response = await axios.post("http://localhost:8070/users/emplogin", {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setLoginError('');
      console.log('Login successful:', response.data);
      setLoggedIn(true);
      window.location.href = '/empdashboard';
    } catch (error) {
      setLoggedIn(false);
      setLoginError(error.response.data.message);
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <div className="dashboard-container-view" style={{  
      backgroundImage: `url(${loginBG2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0',
      padding: '0'
    }}>
      {!loggedIn ? (
        <div className="login-container">
          <img src={loginBG} alt="Login Background" className="login-bg" />
          <div className="login-content">
            <span className="login-heading">Welcome to Login</span>
            <form className="login-form" onSubmit={handleSubmit}>
              {/* Username Input */}
              <label className="login-label1">Username:</label>
              <div className="input-container">
                <input 
                  className="login-input" 
                  type="text" 
                  placeholder="Enter the User Name" 
                  value={username} 
                  onChange={handleUsernameChange} 
                />
                {usernameIconVisible && <img src={userNameIcon} alt="Username Icon" className="input-icon" />}
              </div>
              {usernameError && <p className="error-message">{usernameError}</p>}
              {/* Password Input */}
              <label className="login-label2">Password:</label>
              <div className="input-container">
                <input 
                  className="login-input" 
                  type="password" 
                  placeholder="Enter the Password" 
                  value={password} 
                  onChange={handlePasswordChange} 
                />
                {passwordIconVisible && <img src={passwordIcon} alt="Password Icon" className="input-icon" />}
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
              {/* Login Button */}
              <button className="login-button" type="submit">Login</button>
              {/* Login Error */}
              {loginError && <p className="login-error">{loginError}</p>}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EmpLogin;