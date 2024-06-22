import { useState, useEffect } from 'react';
import Item from '../components/Item';
import { useNavigate } from 'react-router-dom';
import { fetchItems } from '../services/api';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  
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
  }, []);

  return (
    <>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <button onClick={() => navigate('/edit')}>Edite Item</button>
      <button onClick={() => navigate('/create')}>Create Item</button>
      <div>
        {items.map((item) => (
          <Item key={item.ansi} 
          data={item} >
          </Item> 
        ))}
      </div>
    </>
  );
}

export default Dashboard;
