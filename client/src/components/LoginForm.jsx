// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { loginUser } from '../api/userAPI';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const res = await loginUser(email, password);
            setSuccess(`Welcome back, ${res.name || 'user'}!`);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Login</button>

            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default LoginForm;
