import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loginPage, setLoginPage] = useState(true);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginPage) {
            login();
            navigate('/dashboard');
        }
        else {
            register();
            navigate('/dashboard');
        }
    };

    const toggleLoginPage = () => {
        setLoginPage(!loginPage);
    }

    const login = useCallback(async () => {
      try {
        const response = await fetch('/api/accounts/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password: password }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          toast.success('Logged in successfully');
        } else {
          throw new Error(data.message || 'Error logging in');
        }
      }
      catch (error: any) {
          toast.error(error.message);
      }
    }
    , [email, password]);

    const register = useCallback(async () => {
        try {
            const response = await fetch('/api/accounts/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name, username: email, password: password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Register");
                console.log(data);
                toast.success('Registered successfully');
            } else {
                throw new Error(data.message || 'Error registering');
            }
        }
        catch (error: any) {
            toast.error(error.message);
        }
    }, [name, email, password]);

    return (
        <div>
            <h1>{loginPage ? "Login Page" : "Register Page"}</h1>
            <form onSubmit={handleSubmit}>
                {!loginPage && <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>}
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">{loginPage ? "Login" : "Register"}</button>
            </form>
            <button onClick={toggleLoginPage}>{loginPage ? "Click to Register Instead!" : "Click to Login Instead!"}</button>
        </div>
    );
};

export default LoginPage;
