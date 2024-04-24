import React, { useState } from 'react';
import { connect } from 'react-redux';

const Checkout = ({ cart }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., submit order to backend
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more fields for shipping information, payment details, etc. */}
        <button type="submit">Place Order</button>
      </form>
      <div>
        <h3>Order Summary</h3>
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} ({item.quantity})
            </li>
          ))}
        </ul>
        <p>Total: ${cart.total.toFixed(2)}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Checkout);
