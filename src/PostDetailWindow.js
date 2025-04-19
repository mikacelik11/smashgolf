import React from 'react';
import './PostDetailWindow.css'; 

export default function PostDetailWindow({ post, onClose }) {
  return (
    <div className="detail-window">
      <h2>Group Details</h2>
      <p><strong>Location:</strong> {post.golfLocation}</p>
      <p><strong>Skill:</strong> {post.skill}</p>
      <p><strong>Players Needed:</strong> {post.players}</p>
      <p><strong>Description:</strong> {post.description}</p>
      <p><strong>Timestamp:</strong> {post.timestamp}</p>
      <p><strong>Posted By:</strong> {post.owner}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
