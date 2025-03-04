import React, { useState } from 'react';
import './CreateGroupWindow.css';  

function CreateGroupWindow({ onClose }) {
  const [golfLocation, setGolfLocation] = useState('');
  const [skill, setSkill] = useState('beginner');
  const [players, setPlayers] = useState('1');
  const [description, setDescription] = useState('');

  const postGroup = () => {
    console.log('Golf Course Location:', golfLocation);
    console.log('Skill Level:', skill);
    console.log('Number of Players Needed:', players);
    console.log('Description:', description);
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
