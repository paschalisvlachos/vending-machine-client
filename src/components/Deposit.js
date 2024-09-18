import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { depositCoins } from '../api';

const Deposit = ({ token }) => {
  const [coins, setCoins] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coinArray = coins.split(',').map((coin) => parseInt(coin.trim()));
    try {
      const result = await depositCoins(token, coinArray);
      setMessage(`Deposit successful. Total: ${result.totalDeposit}`);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Deposit Coins</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCoins">
          <Form.Label>Enter coins separated by commas (e.g., 5,10,50)</Form.Label>
          <Form.Control
            type="text"
            value={coins}
            onChange={(e) => setCoins(e.target.value)}
            placeholder="5,10,50"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Deposit
        </Button>
      </Form>
    </div>
  );
};

export default Deposit;
