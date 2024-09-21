import React, { useState } from 'react';
import data from './data.json';
import './App.css';
import Modal from './Modal'; // Import the Modal component

function ProductItem({ name, category, price, image, addToCart }) {
  return (
    <li className="product-item">
      <div>
        <img
          src={image.desktop}
          srcSet={`${image.mobile} 325px, ${image.desktop} 1440px, ${image.tablet} 850px`}
          alt={name}
        />
        <button onClick={() => addToCart({ name, price, image })}><b>Add to Cart</b></button>
      </div>
      <p className='product-category'>{category}</p>
      <h2>{name}</h2>
      <p className='product-price'>${price.toFixed(2)}</p>
    </li>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function addToCart(product) {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.name === product.name);
      if (existingProduct) {
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  function removeItem(index) {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  }

  function checkout() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setCart([]);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <h1>Desserts</h1>
      <div className="content">
        <ul className="product-list">
          {data.map((product, index) => (
            <ProductItem key={index} {...product} addToCart={addToCart} />
          ))}
        </ul>
        <div className="cart">
          <h2>Your Cart ({totalItems})</h2>
          {cart.length === 0 ? (
            <>
              <img src={`${process.env.PUBLIC_URL}/assets/images/illustration-empty-cart.svg`} alt="Empty cart" className="empty-cart-image" />
              <p className='empty-cart-p'>Your added items will appear here</p>
            </>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    <div className='desserts-container'>
                      <div>
                        <span className='item-name'>{item.name}</span>
                        <div className='item-quantity-price'>
                          <p className='item-quantity'>{item.quantity}x</p>
                          <p className='item-price'>@ ${item.price.toFixed(2)} </p>
                          <p className='item-sum-price'>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <img src={`${process.env.PUBLIC_URL}/assets/images/icon-remove-item.svg`} alt="remove" className="remove-item" onClick={() => removeItem(index)} />
                  </div>
                  </li>
                ))}
              </ul>
              <p className='order-total'>Order Total: <span className='order-total-payment'>${total.toFixed(2)}</span></p>
              <div className='carbon-container'>
                <img src={`${process.env.PUBLIC_URL}/assets/images/icon-carbon-neutral.svg`} alt="Carbon Neutral" className="carbon-neutral" />
                <p>This is a <b>carbon-neutral</b> delivery</p>
              </div>
              <button className="checkout-button" onClick={checkout}>Confirm Order</button>
            </>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} cart={cart}>
        <img src={`${process.env.PUBLIC_URL}/assets/images/icon-order-confirmed.svg`} alt="Order Confirmed" className="order-confirmed" />
        <h2>Order Confirmed!</h2>
        <p>We hope you enjoy your food!</p>
        <div className='bought-items'>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <img src={item.image.thumbnail} alt={item.name} className="modal-item-image" />
              <div className='desserts-container'>
                <div>
                  <span className='item-name'>{item.name}</span>
                  <div className='item-quantity-price'>
                    <p className='item-quantity'>{item.quantity}x</p>
                    <p className='item-price'>@ ${item.price.toFixed(2)} </p>
                  </div>
                </div>
                <span className='item-sum-price'>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className='order-total'>Order Total: <span className='order-total-payment'>${total.toFixed(2)}</span></p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
