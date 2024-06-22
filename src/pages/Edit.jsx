import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const itemId = localStorage.getItem('itemId');

  }, []);

  const handleChange = (e) => {
    setItem({
        ...item,
        [e.target.name]: e.target.value
    });
}

  const handleEdit = () => {
    
    navigate('/dashboard');
  };

  return (
    <div>
        <button className="button" onClick={() => {navigate('/dashboard')}}>Back to Dashboard</button>
        <h1>Edit Item</h1>
        <div>
            <p>hola</p>
        </div>
        <button className="button" onClick={handleEdit}>Save</button>
    </div>
  );
}

export default Edit;
