import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Item = forwardRef(({ data, onDelete }, ref) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    localStorage.setItem('itemId', data.id);
    navigate('/edit');
  };

  return (
    <div ref={ref}>
      {Object.keys(data).map(key => (
        key === 'imgUrl' ? (
          <img key={key} src={data[key]} alt="Item Image" style={{ maxWidth: '100%', height: 'auto' }} />
        ) : (
          <p key={key}>
            <strong>{key}:</strong> {data[key]}
          </p>
        )
      ))}
      <button onClick={handleEdit}>Edit Item</button>
      <button onClick={() => onDelete(data.id)}>Delete Item</button>
    </div>
  );
});

export default Item;
