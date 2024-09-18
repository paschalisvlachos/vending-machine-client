import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { loginUser } from '../api';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, password };
      const result = await loginUser(data);
      setToken(result.token);
      setMessage('Logged in successfully');
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
      <h2>Login</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
