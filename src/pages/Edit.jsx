import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEditItem } from '../services/api';
import { fetchGetItemById } from '../services/api';

const Edit = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState({
    itemId: '',
    boughtLastMonth: 0,
    imgUrl: '',
    isBestSeller: false,
    price: 0.0,
    stars: 0,
    title: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getItem = async () => {
      try {
        const data = await fetchGetItemById(localStorage.getItem('itemId'));
        console.log(data);
        setItem(data);
      } catch (error) {
        console.log(error)
      }
    };
    getItem();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchEditItem(item);
      console.log(response);
      
      navigate('/dashboard');
    } catch (error) {
      setErrors(error.response);
    }
  }

  return (
    <main>
                  <button className="button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <div>
        <article>
          <h1>Edit Item</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="itemId">ItemId</label>
              <input
                type="text"
                name="itemId"
                id="itemId"

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

                onChange={handleChange}
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

                onChange={handleChange}
                required
              />
              {errors.stars && <p>{errors.stars}</p>}
            </div>
            <div>
              <label htmlFor="boughtLastMonth">Bought Last Month</label>
              <input
                type="number"
                name="boughtLastMonth"
                id="boughtLastMonth"
                onChange={handleChange}
                required
              />
              {errors.boughtLastMonth && <p>{errors.boughtLastMonth}</p>}
            </div>
            <div>
              <label htmlFor="imgUrl">Image URL</label>
              <input
                type="text"
                name="imgUrl"
                id="imgUrl"
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
