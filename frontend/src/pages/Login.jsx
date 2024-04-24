import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:443/api/v1/login', formData);
            if (response.status === 200) {
                console.log('Login successful');
                toast.success('Login successful'); // Display success toast
                setTimeout(() => {
                    window.location.href = '/products'; // Redirect to products page after a delay
                }, 1000);
            } else {
                console.error('Login failed');
                toast.error('Login failed. Please check your credentials and try again.'); // Display error toast
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login. Please try again later.'); // Display error toast
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <ToastContainer /> {/* Render the ToastContainer component */}
        </div>
    );
};

export default Login;
