import React from 'react';
import Home from './components/Home/Home.tsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Routing/Layout.tsx';
import Donate from './components/Donate/Donate.tsx';
import Contact from './components/Contact/Contact.tsx';
import { toast } from 'react-toastify';
import React, { useEffect, } from 'react';
import Inspiration from './components/Inspiration/Inspiration.tsx';

function App() {

	// connect to web socket
	useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000/');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("WebSocket Message:", message);
            if (message.type === 'notification') {
                displayNotification(message.message, 'info');
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            ws.close();
        };
	}, []);

	const displayNotification = (message, type) => {
		toast[type](message, { position: 'top-center' });
	};
		
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					{/* <Route path="/about" element={<About/>} /> */}
					<Route path="/donate" element={<Donate/>} />
					<Route path="/contact" element={<Contact/>} />
					<Route path="/inspiration" element={<Inspiration/>} />
					<Route path="*" element={<Home />} />
				</Route>
			</Routes>
			<ToastContainer/>
		</BrowserRouter>
	);
}

export default App;
