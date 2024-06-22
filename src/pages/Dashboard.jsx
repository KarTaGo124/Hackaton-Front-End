import React, { useState, useEffect } from 'react';
import Item from '../components/Item';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const initialItems = [
  { id: 1, name: 'Laptop', quantity: 10, price: 999.99 },
  { id: 2, name: 'Smartphone', quantity: 15, price: 699.99 },
  { id: 3, name: 'Tablet', quantity: 20, price: 499.99 },
  { id: 4, name: 'Headphones', quantity: 25, price: 199.99 },
  { id: 5, name: 'Smartwatch', quantity: 30, price: 299.99 }
];

const Dashboard = () => {
  const [items, setItems] = useState(initialItems);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
    setRender(!render);
  };

  const handleLogout = async () => {
    try {
      console.log('Logged out');
      navigate('/auth/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [render, items]);

  return (
    <>
      <div>
        <button className="button-auth" onClick={handleLogout}>Logout</button>
      </div>
      <button className="button" onClick={() => navigate('/create')}>Create Item</button>
      <div>
        {items.map((item) => (
          <Item 
            key={item.id} 
            data={item} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
