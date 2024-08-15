import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Inspiration: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loginPage, setLoginPage] = useState(true);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Our Inspiration</h1>
            <br></br>
            <h2>Meet Nafi: </h2>
            
        </div>
    );
};

export default Inspiration;
