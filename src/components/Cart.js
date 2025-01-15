import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";

const Cart = ({ cart }) => {
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    navigate("/");
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Go add some toys!</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-info">
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
