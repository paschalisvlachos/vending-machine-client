import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import { Table, Alert } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts();
        setProducts(result);
      } catch (error) {
        setMessage('Error fetching products: ' + error.response.data.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      {message && <Alert variant="danger">{message}</Alert>}
      {products.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Cost (cents)</th>
              <th>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.cost}</td>
                <td>{product.amountAvailable}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
