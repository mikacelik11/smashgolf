import React, { useState } from 'react';
import './App.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [activeSection, setActiveSection] = useState('home'); // sets the base section of the website to home section

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


  const [isCreateGroupModelOpen, setIsCreateModalOpen] = useState(false);

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


  const openCreateGroupModal = () => setIsCreateModalOpen(true);
  const closeCreateGroupModal = () => setIsCreateModalOpen(false);

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <h1>Smash Golf</h1>
        </div>
        <div className="navbar-right">
          <ul className="nav-links">
            <li onClick = {() => setActiveSection('home')}>Home</li> 
            <li onClick = {() => setActiveSection('group')}>Group</li>
            <li onClick = {() => setActiveSection('profile')}>Profile</li>
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

      <main className="home-section">
        {isSignedIn ? (
          <>
            {activeSection === 'home' && (
              <div className="content">
                <h2>Welcome Home</h2>
                <p>Look for avalible groups, and start swinging!</p>
                <div>
                  <button className = "create-group-button" onClick={openCreateGroupModal}>Create Group</button>
                </div>
              </div>
            )}
            {activeSection === 'group' && (
              <div className="content">
                <h2>Your Groups</h2>
                <p>Here you can manage your groups.</p>
              </div>
            )}
            {activeSection === 'profile' && (
              <div className="content">
                <h2>Your Profile</h2>
                <p>Profile details go here.</p>
              </div>
            )}
          </>
        ) : (
          <div className="not-signed-in">
            <p>Sign in to view content</p>
          </div>
        )}
      </main>


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
              type="text" // renders a single line text input field
              placeholder="Username" // the word username will appear inside the field in a lighter color
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
            />
            <input
              type="password" // renders a single line text input field
              placeholder="Password" // masks the input
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

