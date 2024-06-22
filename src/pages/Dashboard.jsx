import { useState, useEffect } from 'react';
import Item from '../components/Item';
import { useNavigate } from 'react-router-dom';
import { fetchItems } from '../services/api';
import { deleteProduct } from '../services/api';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();


  const handleDelete = async (id) => {
    try {
        await deleteProduct(id)
        setRender(render+1);
    } catch (error) {
        console.log(error);
    }
}
const handleEdit = async(id) => {
  localStorage.setItem('itemId', id)
  navigate('/edit')
}
  const handleLogout = async () => {
    try {
      console.log('Logged out');
      navigate('/auth/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchItems(10, null);
        setItems(response.data.items);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [render]);

  return (
    <>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <button onClick={() => navigate('/create')}>Create Item</button>
      <div>
        {items.map((item) => (
          <Item key={item.ansi} 
          data={item} >
          <button className="button" onClick={() => handleDelete(item.ansi)}>Borrar Producto</button>
          <button className="button" onClick={() => handleEdit(item.ansi)}>Editar Producto</button>
          </Item> 
        ))}
      </div>
    </>
  );
}

export default Dashboard;
