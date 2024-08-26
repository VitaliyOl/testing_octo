import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 18px;
  margin-right: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #213547;
  border-radius: 5px;
  background-color: #262626;
  color: #ffffff;
  font-size: 18px;
  margin-right: 10px;
  outline: none;

  &:focus {
    border-color: #00aaff;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #008ecc;
  }
`;

const ResetButton = styled.button`
  padding: 10px 20px;
  background-color: #a0a0a0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin-left: 20px;

  &:hover {
    background-color: #cc0000;
  }
`;

function GameInput({ onSubmit, onReset }) {
  const [gameName, setGameName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(gameName);
    setGameName('');
  };

  const handleReset = () => {
    onReset();
    setGameName('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="gameName">Game Name:</Label>
      <Input
        type="text"
        id="gameName"
        value={gameName}
        onChange={e => setGameName(e.target.value)}
        placeholder="Enter game name..."
      />
      <SubmitButton type="submit">Submit</SubmitButton>
      <ResetButton type="button" onClick={handleReset}>
        Reset
      </ResetButton>
    </Form>
  );
}

export default GameInput;
