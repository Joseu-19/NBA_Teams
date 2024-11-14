import React from "react";

const PokeModal = ({ isOpen, onClose, price }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Price: ${price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PokeModal;
