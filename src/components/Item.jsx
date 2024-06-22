import React from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({ data, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    localStorage.setItem('itemId', data.id);
    navigate('/edit');
  };

  return (
    <div className="item">
      {Object.keys(data).map(key => (
        <p key={key}>
          <strong>{key}:</strong> {data[key]}
        </p>
      ))}
      <button className="button" onClick={handleEdit}>Edit Item</button>
      <button className="button" onClick={() => onDelete(data.id)}>Delete Item</button>
    </div>
  );
}

export default Item;
