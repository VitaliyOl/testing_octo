import React, { useState } from 'react';

function GameInput({ onSubmit }) {
  const [gameName, setGameName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(gameName);
    setGameName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="gameName">Game Name:</label>
      <input
        type="text"
        id="gameName"
        value={gameName}
        onChange={e => setGameName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default GameInput;
