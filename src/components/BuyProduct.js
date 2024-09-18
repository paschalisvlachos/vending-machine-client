import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { getProducts, buyProduct } from '../api';

const BuyProduct = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await buyProduct(token, productId, amount);
      setMessage(`Purchase successful! Total spent: ${result.totalSpent}`);
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Buy Product</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProduct">
          <Form.Label>Select a product</Form.Label>
          <Form.Control as="select" value={productId} onChange={(e) => setProductId(e.target.value)} required>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.productName} - ${product.cost / 100}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Buy
        </Button>
      </Form>
    </div>
  );
};

export default BuyProduct;
