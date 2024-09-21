// Modal.js
import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
if (!isOpen) return null;

return (
    <div className="modal-overlay">
        <div className="modal-content">
        {children}
        <button className="close-button" onClick={onClose}>Start New Order</button>
        </div>
    </div>
);
}

export default Modal;
