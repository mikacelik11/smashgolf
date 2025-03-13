import React, { useState } from 'react';
import CreateGroupWindow from './CreateGroupWindow';
import NewWindow from 'react-new-window';
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


  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const [groupPosts, setGroupPosts] = useState([]);

  const handleCreateGroup = (newPost) => {
    setGroupPosts([...groupPosts, {id: Date.now(), ...newPost }])
  }

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


  const openCreateGroupWindow = () => setShowCreateGroup(true);
  const closeCreateGroupWindow = () => setShowCreateGroup(false);


  // renders the website that splits the website into 3 sections home, group, and profile.
  // When users are signed in and in home they will be able to see posts and be able to join the groups
  // profile will be able to edit skill level, username, etc
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
                  <button className = "create-group-button" onClick={openCreateGroupWindow}>Create Group</button>
                  {groupPosts.length === 0 ? (
                    <p>No group posts yet.</p>
                  ) : (
                    groupPosts.map((post) => (
                      <div key={post.id} className="post-card">
                        <p><strong>Location:</strong> {post.golfLocation}</p>
                        <p><strong>Skill:</strong> {post.skill}</p>
                        <p><strong>Players Needed:</strong> {post.players}</p>
                        <p><strong>Description:</strong> {post.description}</p>
                        <p><strong>Timestamp:</strong> {post.timestamp}</p>
                        <p><strong>Posted By:</strong> {post.owner}</p>
                    </div>
                    ))
                  )}
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

      {showCreateGroup && (
        <NewWindow title="Create Group" onUnload={closeCreateGroupWindow}>
        <CreateGroupWindow
          onClose={closeCreateGroupWindow}
          onCreateGroup={handleCreateGroup}
        />
        </NewWindow>
      )}

      
    </div>
  );
} 

export default App;

