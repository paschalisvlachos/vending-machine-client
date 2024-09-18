import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { registerUser } from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, password, role };
      console.log('------', username)
      const result = await registerUser(data);
      setMessage(`User ${result.username} registered successfully`);
    } catch (error) {
      // Check if the error has a response object and display the appropriate message
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.message);
      } else {
        setMessage('Error: Something went wrong');
      }
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsernameRegister">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPasswordRegister">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
