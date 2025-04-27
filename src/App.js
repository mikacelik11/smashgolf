import React, { useState } from 'react';
import CreateGroupWindow from './CreateGroupWindow';
import NewWindow from 'react-new-window';
import PostDetailWindow from './PostDetailWindow';
import './App.css';

function App() {
  const [selectedPost, setSelectedPost] = useState(null);

  const [isSignedIn, setIsSignedIn] = useState(false);

  const [activeSection, setActiveSection] = useState('home'); // sets the base section of the website to home section

  const [users, setUsers] = useState([]);

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);

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

  const handleSkillChange = (newSkill) => {
    const updatedUser = { ...currentUser, skill: newSkill };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    ));
    setIsEditingSkill(false);
  };


  const handleLocationChange = (newLocation) => {
    const updatedUser = { ...currentUser, location: newLocation };
    setCurrentUser(updatedUser);
    setUsers(users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    ));
    setIsEditingLocation(false);
  };


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
    if (!signInUsername.trim() || !signInPassword) {
      setSignInError('Please enter both username and password.');
      return;
    }
    const user = users.find(
      (u) => u.username === signInUsername && u.password === signInPassword
    );
    if (user) {
      setCurrentUser(user);
      setIsSignedIn(true);
      closeSignInModal();
    } else {
      setSignInError('Invalid username or password.');
    }
  };

  // Handle account creation; checks if the username is already taken
  const handleSignUp = () => {
    const newUser = {
      username: signUpUsername,
      password: signUpPassword,
      skill: 'beginner',
      location: ''
    };
    if (!signUpUsername.trim() || !signUpPassword) {
      setSignUpError('Username and Password are required');
      return;
    }

    const userExists = users.some((u) => u.username === signUpUsername);
    if (userExists) {
      setSignUpError('Username is already taken.');
    } else {
      setUsers([...users, { username: signUpUsername, password: signUpPassword }]);
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setIsSignedIn(true);
      closeSignUpModal();
      closeSignInModal();
    }
  };

  // Handle signing out
  const handleSignOut = () => {
    setIsSignedIn(false);
    setCurrentUser(null);
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
                      <div
                        key={post.id}
                        className="post-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                         // TODO: open this post in a new window
                        console.log('Clicked post', post.id);
                        }}
                        onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                        console.log('Clicked post via keyboard', post.id);
                        }
                        }}
                      >
                      <div 
                        key={post.id}
                        className="post-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedPost(post)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') { 
                            setSelectedPost(post);
                          }
                        }}
                      >
                        <p><strong>Location:</strong> {post.golfLocation}</p>
                        <p><strong>Skill:</strong> {post.skill}</p>
                        <p><strong>Players Needed:</strong> {post.players}</p>
                        <p><strong>Description:</strong> {post.description}</p>
                        <p><strong>Timestamp:</strong> {post.timestamp}</p>
                        <p><strong>Posted By:</strong> {post.owner}</p>
                    </div>
                    </div>
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
           
            {activeSection === 'profile' && currentUser && (
              <div className="profile-container">
                {/* Avatar circle (just first letter for now) */}
                <div className="profile-avatar">
                  {currentUser.username[0].toUpperCase()}
                </div>

                {/* Username, styled big and clickable */}
                <h2
                  className="profile-username"
                  role="button"
                  tabIndex={0}
                /* TODO: wire up click-to-edit */
                >
                  {currentUser.username}
                </h2>

                {/* Each field is its own “row”, clickable for editing */}
                <div
                  className="profile-field"
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsEditingSkill(true)}
                /* TODO: wire up click-to-edit */
                >
                   <span className="field-label">Skill Level</span>
                  {isEditingSkill ? (
                    <select
                      value={currentUser.skill}
                      onChange={(e) => handleSkillChange(e.target.value)}
                      onBlur={() => setIsEditingSkill(false)}
                      autoFocus
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  
                  ) : (<span className="field-value">{currentUser.skill}</span>)}
                </div>

                <div
                  className="profile-field"
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsEditingLocation(true)}
                >
                  <span className="field-label">Location</span>
                  {isEditingLocation ? (
                    <input
                      type="text"
                      value={currentUser.location}
                      onChange={(e) => setCurrentUser({
                        ...currentUser,
                        location: e.target.value
                      })}
                      onBlur={(e) => handleLocationChange(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <span className="field-value">{currentUser.location || 'Not set'}</span>
                  )}
                </div>
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



      {selectedPost && ( 
        <NewWindow
          title={`Group ${selectedPost.id}`} // set the windows title bar to group id
          // when the window is closeed by thr user, clear selectedPost
          onUnload={() => setSelectedPost(null)}
        >
          <PostDetailWindow
            post={selectedPost}  // pass the full post object so the child can display it

            onClose={() => setSelectedPost(null)} // given the child a way to close itself
          />
        </NewWindow>
      )}


      
    </div>
  );
} 

export default App;

