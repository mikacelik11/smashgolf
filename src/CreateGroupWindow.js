import React, { useState } from 'react';
import './CreateGroupWindow.css';

function CreateGroupWindow({ onClose, onCreateGroup, currentUser }) {
  const [golfLocation, setGolfLocation] = useState('');
  const [skill, setSkill] = useState('beginner');
  const [players, setPlayers] = useState('1');
  const [description, setDescription] = useState('');

  const postGroup = () => {
    const newPost = {
      golfLocation,
      skill,
      players,
      description,
      timestamp: new Date().toLocaleString(), 
      owner: currentUser, 
      requests: [],
      accepted: []
    };

    
    onCreateGroup(newPost);
    onClose(); 
  };

  return (
    <div className="create-group-window">
      <h2>Create Group</h2>

      <label htmlFor="golfLocation">Golf Course Location:</label>
      <input
        type="text"
        id="golfLocation"
        placeholder="Enter golf course location"
        value={golfLocation}
        onChange={(e) => setGolfLocation(e.target.value)}
        className="create-group-input"
      />

      <label htmlFor="skill">Skill Level:</label>
      <select
        id="skill"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="create-group-select"
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <label htmlFor="players">Number of Players Needed:</label>
      <select
        id="players"
        value={players}
        onChange={(e) => setPlayers(e.target.value)}
        className="create-group-select"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        placeholder="Enter a description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="create-group-textarea"
      />

      <button onClick={postGroup} className="create-group-button">
        Post Group
      </button>
      <button onClick={onClose} className="close-group-button">
        Close
      </button>
    </div>
  );
}

export default CreateGroupWindow;
