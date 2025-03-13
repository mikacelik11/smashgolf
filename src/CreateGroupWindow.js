import React, { useState } from 'react';
import './CreateGroupWindow.css';

function CreateGroupWindow({ onClose, onCreateGroup, currentUser }) {
  const [golfLocation, setGolfLocation] = useState(''); // set location to an empty string
  const [skill, setSkill] = useState('beginner'); // set base difficulty as beginner
  const [players, setPlayers] = useState('1'); // accounts for user
  const [description, setDescription] = useState(''); // set descirption to empty string

  const postGroup = () => {
    const newPost = {
      golfLocation, // vales assigned to the corresponding keys in the object
      skill,
      players,
      description,
      timestamp: new Date().toLocaleString(), // gives date on when group was posted
      owner: currentUser, // labels the owner of the post
      requests: [], // empty array to store members if they want to be in the group
      accepted: [] // empty array to store members that are in the group
    };

    
    onCreateGroup(newPost); // used to handle the creation of a new group when user submits form
    onClose(); // closes the create group window
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
