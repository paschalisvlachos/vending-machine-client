import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { resetDeposit } from '../api';

const ResetDeposit = ({ token }) => {
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      const result = await resetDeposit(token);
      setMessage(result.message);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Reset Deposit</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Button variant="danger" onClick={handleReset}>
        Reset Deposit
      </Button>
    </div>
  );
};

export default ResetDeposit;
