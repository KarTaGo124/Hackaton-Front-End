import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postItems, getRoleBasedOnToken } from '../services/api';

const Create = () => {
    const [newItem, setNewItem] = useState({
        boughtInLastMonth: 0,
        imgUrl: '',
        isBestSeller: false,
        price: 0.0,
        stars: 0,
        title: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const role = getRoleBasedOnToken();
            if (role !== 'admin') {
                alert('Access denied. Only admins can create items.');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error.message);
            navigate('/auth/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewItem({
            ...newItem,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleCreate = async () => {
        try {
            const res = await postItems(newItem);

            console.log('Item created:', res);

        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    return (
        <div>
            <button className="button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            <h1>Create New Item</h1>
            <div>
                <label>Title:</label>
                <input 
                    type="text" 
                    name="title" 
                    value={newItem.title} 
                    onChange={handleChange}
                    required
                />
                <label>Bought in Last Month:</label>
                <input 
                    type="number" 
                    name="boughtInLastMonth" 
                    value={newItem.boughtInLastMonth} 
                    onChange={handleChange}
                    required
                />
                <label>Image URL:</label>
                <input 
                    type="text" 
                    name="imgUrl" 
                    value={newItem.imgUrl} 
                    onChange={handleChange}
                    required
                />
                <label>Is Best Seller:</label>
                <input 
                    type="checkbox" 
                    name="isBestSeller" 
                    checked={newItem.isBestSeller} 
                    onChange={handleChange}
                />
                <label>Price:</label>
                <input 
                    type="number" 
                    name="price" 
                    value={newItem.price} 
                    onChange={handleChange}
                    step="0.01"
                    required
                />
                <label>Stars:</label>
                <input 
                    type="number" 
                    name="stars" 
                    value={newItem.stars} 
                    onChange={handleChange}
                    min="0"
                    max="5"
                    required
                />
            </div>
            <button className="button" onClick={handleCreate}>Create Item</button>
        </div>
    );
}

export default Create;
