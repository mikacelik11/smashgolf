import React, { useState } from 'react';
import './App.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => setIsSignedIn(true);
  const handleSignOut = () => setIsSignedIn(false);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Smash Golf</h1>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li>Home</li>
            <li>Group</li>
            <li>Profile</li>
          </ul>
          {!isSignedIn ? (
            <button className="auth-button" onClick={handleSignIn}>
              Sign In
            </button>
          ) : (
            <button className="auth-button" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        </div>
      </nav>
      <header className="App-header">
        <p>Look for a group</p>
      </header>
    </div>
  );
}

export default App;
