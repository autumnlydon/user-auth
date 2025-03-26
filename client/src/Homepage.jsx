import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>User Auth App</h1>
            <button className="homepage-btn" onClick={() => navigate('/signup')}>Signup</button>
            <button className="homepage-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
    )
    
}