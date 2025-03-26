import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        console.log(data);

        if (data.token) {
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
}

    return (
        <div>
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
