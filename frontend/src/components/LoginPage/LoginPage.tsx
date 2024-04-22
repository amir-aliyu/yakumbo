import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loginPage, setLoginPage] = useState(true);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginPage) {
            testLogin();
        }
        else {
            testRegister();
            console.log(name, email, password);
        }
    };

    const toggleLoginPage = () => {
        setLoginPage(!loginPage);
    }

    const testLogin = useCallback(async () => {
      try {
        const response = await fetch('/api/accounts/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, password: password }),
        });
        const data = await response.text();
        if (response.ok) {
            
            // Navigate to /dashboard
            window.location.href = '/dashboard';
          console.log(data);
        } else {
          throw new Error(data || 'Error logging in');
        }
      }
      catch (error: any) {
          toast.error(error.message);
      }
    }
    , [email, password]);

    const testingCookie = async () => {
        try {
            const response = await fetch('/api/accounts/cookies', {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            const data = await response.text();
            if (response.ok) {
                console.log(data);
            } else {
                throw new Error(data || 'Error getting cookie');
            }
        }
        catch (error: any) {
            toast.error(error.message);
        }
    }

    const testRegister = useCallback(async () => {
        try {
            const response = await fetch('/api/accounts/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name, username: email, password: password }),
            });
            const data = await response.text();
            if (response.ok) {
                console.log(data);
            } else {
                throw new Error(data || 'Error registering');
            }
        }
        catch (error: any) {
            toast.error(error.message);
        }
    }, [name, email, password]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{loginPage ? "Login Page" : "Registration Page"}</h1>
            <form onSubmit={handleSubmit} >
                {!loginPage && (
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <label style={{marginRight: '20px'}}>Email: </label>
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' , marginTop: '10px'}}>
                    <div>
                        <label style={{marginRight: '20px'}}>Password: </label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </div>
                </div>
                <br/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                </div>
                <button onClick={handleSubmit} type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 40px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '20px' }}>{loginPage ? "Login" : "Register"}</button>
            </form>
            <button onClick={toggleLoginPage} style={{ backgroundColor: '#008CBA', color: 'white', padding: '10px 40px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>{loginPage ? "No account? Register here" : "Have an account? Login here"}</button>

            {/* <button onClick={testingCookie}>TESTING</button> */}
        </div>
    );
};

export default LoginPage;
