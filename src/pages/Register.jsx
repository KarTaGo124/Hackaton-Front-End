import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
        role: '',
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetchRegister(data);
            console.log(res);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Username" onChange={handleChange} required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} required />
            <label htmlFor="role">Role</label>
            <input type="text" id="role" name="role" placeholder="Role" onChange={handleChange} required />
            <button type="submit">Register</button>
            <button type="button" onClick={() => navigate('/auth/login')}>Go to Login</button>
        </form>
    );
};

export default Register;
