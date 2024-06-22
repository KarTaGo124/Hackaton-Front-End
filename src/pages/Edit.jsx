import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEditItem, getRoleBasedOnToken } from '../services/api';

const Edit = () => {
    const navigate = useNavigate();
    const [item, setItem] = useState({
        itemId: '',
        boughtInLastMonth: 0,
        imgUrl: '',
        isBestSeller: false,
        price: 0.0,
        stars: 0,
        title: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Check if user is admin
        try {
            const role = getRoleBasedOnToken();
            if (role !== 'admin') {
                alert('Access denied. Only admins can edit items.');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error.message);
            navigate('/auth/login');
        }

    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setItem(prevItem => ({
            ...prevItem,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchEditItem(item);
            console.log(response);
            navigate('/dashboard');
        } catch (error) {
            setErrors(error.response.data || {});
        }
    };

    return (
        <main>
            <button className="button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            <div>
                <article>
                    <h1>Edit Item</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="itemId">Item ID</label>
                            <input
                                type="text"
                                name="itemId"
                                id="itemId"
                                value={item.itemId}
                                onChange={handleChange}
                                required
                            />
                            {errors.itemId && <p>{errors.itemId}</p>}
                        </div>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={item.title}
                                onChange={handleChange}
                                required
                            />
                            {errors.title && <p>{errors.title}</p>}
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={item.price}
                                onChange={handleChange}
                                step="0.01"
                                required
                            />
                            {errors.price && <p>{errors.price}</p>}
                        </div>
                        <div>
                            <label htmlFor="stars">Stars</label>
                            <input
                                type="number"
                                name="stars"
                                id="stars"
                                value={item.stars}
                                onChange={handleChange}
                                min="0"
                                max="5"
                                required
                            />
                            {errors.stars && <p>{errors.stars}</p>}
                        </div>
                        <div>
                            <label htmlFor="boughtInLastMonth">Bought in Last Month</label>
                            <input
                                type="number"
                                name="boughtInLastMonth"
                                id="boughtInLastMonth"
                                value={item.boughtInLastMonth}
                                onChange={handleChange}
                                required
                            />
                            {errors.boughtInLastMonth && <p>{errors.boughtInLastMonth}</p>}
                        </div>
                        <div>
                            <label htmlFor="imgUrl">Image URL</label>
                            <input
                                type="text"
                                name="imgUrl"
                                id="imgUrl"
                                value={item.imgUrl}
                                onChange={handleChange}
                                required
                            />
                            {errors.imgUrl && <p>{errors.imgUrl}</p>}
                        </div>
                        <div>
                            <label htmlFor="isBestSeller">Best Seller</label>
                            <input
                                type="checkbox"
                                name="isBestSeller"
                                id="isBestSeller"
                                checked={item.isBestSeller}
                                onChange={handleChange}
                            />
                            {errors.isBestSeller && <p>{errors.isBestSeller}</p>}
                        </div>
                        <div>
                            <button
                                id="itemSubmit"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </article>
            </div>
        </main>
    );
};

export default Edit;
