import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Register from './components/Register';
import Login from './components/Login';
import Deposit from './components/Deposit';
import BuyProduct from './components/BuyProduct';
import ResetDeposit from './components/ResetDeposit';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Container>
      <Row>
        <Col>
          {!token ? (
            <div>
              <h1>Vending Machine API</h1>
              <Login setToken={setToken} />
              <Register />
            </div>
          ) : (
            <div>
              <h1>Welcome to the Vending Machine</h1>
              <Deposit token={token} />
              <BuyProduct token={token} />
              <ResetDeposit token={token} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
