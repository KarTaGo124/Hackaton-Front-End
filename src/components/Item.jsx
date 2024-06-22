import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../services/api';

const Item = forwardRef(({ data, onDelete }, ref) => {
  const navigate = useNavigate();
  const [id, setId] = useState('');

  const handleDelete = async () => {
    try {
        setId(localStorage.getItem('itemId'));
        await deleteProduct(id)
        console.log('Deleted');
        navigate('/dashboard');
    } catch (error) {
        console.log(error);
    }
}
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
      <button onClick={()=> handleDelete}>Delete Item</button>
    </div>
  );
});

export default Item;
