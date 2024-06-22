import { useState, useEffect, useRef, useCallback } from 'react';
import Item from '../components/Item';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, fetchItems, getRoleBasedOnToken } from '../services/api';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(false);
  const [role, setRole] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const observer = useRef();

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setRender(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logged out');
      navigate('/auth/login');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreItems = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetchItems(10, page);
      setItems(prevItems => [...prevItems, ...response.data.items]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchItems(10, 0);
        setItems(response.data.items);
        const userRole = getRoleBasedOnToken();
        setRole(userRole);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [render]);

  const lastItemElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMoreItems();
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading]);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {role === 'Admin' && (
        <button onClick={() => navigate('/create')}>Create Item</button>
      )}
      <div>
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <Item 
                ref={lastItemElementRef} 
                key={item.ansi} 
                data={item} 
                onDelete={handleDelete} 
              />
            );
          } else {
            return (
              <Item 
                key={item.ansi} 
                data={item} 
                onDelete={handleDelete} 
              />
            );
          }
        })}
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default Dashboard;
