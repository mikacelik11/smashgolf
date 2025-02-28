import React, { useState } from 'react';
import './App.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [users, setUsers] = useState([]);

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  // Sign In form state
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  // Sign Up form state
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');

   // Open and reset the sign in modal
   const openSignInModal = () => {
    setSignInError('');
    setSignInUsername('');
    setSignInPassword('');
    setIsSignInModalOpen(true);
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  // Open and reset the sign up modal
  const openSignUpModal = () => {
    setSignUpError('');
    setSignUpUsername('');
    setSignUpPassword('');
    setIsSignUpModalOpen(true);
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  // Handle the sign in attempt by matching credentials from our users array
  const handleSignIn = () => {
    const user = users.find(
      (u) => u.username === signInUsername && u.password === signInPassword
    );
    if (user) {
      setIsSignedIn(true);
      closeSignInModal();
    } else {
      setSignInError('Invalid username or password.');
    }
  };

  // Handle account creation; checks if the username is already taken
  const handleSignUp = () => {
    const userExists = users.some((u) => u.username === signUpUsername);
    if (userExists) {
      setSignUpError('Username is already taken.');
    } else {
      setUsers([...users, { username: signUpUsername, password: signUpPassword }]);
      setIsSignedIn(true);
      closeSignUpModal();
      closeSignInModal();
    }
  };

  // Handle signing out
  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>smashgolf</h1>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li>Home</li>
            <li>Group</li>
            <li>Profile</li>
          </ul>
          {isSignedIn ? (
            <button className="auth-button" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button className="auth-button" onClick={openSignInModal}>
              Sign In
            </button>
          )}
        </div>
      </nav>
      {isSignInModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sign In</h2>
            <input
              type="text"
              placeholder="Username"
              value={signInUsername}
              onChange={(e) => setSignInUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
            {signInError && <p className="error">{signInError}</p>}
            <button onClick={handleSignIn}>Sign In</button>
            <p>
              Don't have an account?{' '}
              <span
                className="link"
                onClick={() => {
                  closeSignInModal();
                  openSignUpModal();
                }}
              >
                Create Account
              </span>
            </p>
            <button className="modal-close" onClick={closeSignInModal}>
              Close
            </button>
          </div>
        </div>
      )}
      {isSignUpModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Account</h2>
            <input
              type="text"
              placeholder="Username"
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            {signUpError && <p className="error">{signUpError}</p>}
            <button onClick={handleSignUp}>Create Account</button>
            <button className="modal-close" onClick={closeSignUpModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 

export default App;
