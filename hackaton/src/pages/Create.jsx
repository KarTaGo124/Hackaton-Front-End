import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    quantity: 0,
    price: 0
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewItem({
        ...newItem,
        [e.target.name]: e.target.value
    });
    }

  const handleCreate = () => {

    navigate('/dashboard');
  };

  return (
    <div>
        <button className="button" onClick={() => {navigate('/dashboard')}}>Back to Dashboard</button>
        <h1>Create New Item</h1>
        <div>
            <label>Name:</label>
            <input 
            type="text" 
            name="name" 
            value={newItem.name} 
            onChange={handleChange}
            />
            <label>Quantity:</label>
            <input 
            type="number" 
            name="quantity" 
            value={newItem.quantity} 
            onChange={handleChange}
            />
            <label>Price:</label>
            <input 
            type="number" 
            name="price" 
            value={newItem.price} 
            onChange={handleChange}
            />
        </div>
        <button className="button" onClick={handleCreate}>Create Item</button>
    </div>
  );
}

export default Create;
