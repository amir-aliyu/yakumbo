import Home from './components/Home/Home.tsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Routing/Layout.tsx';
import Friends from './components/Friends/Friends.tsx';
import Preferences from './components/Preferences/Preferences.tsx';
import History from './components/History/History.tsx';
import { toast } from 'react-toastify';
import React, { useEffect, } from 'react';
import LoginPage from './components/LoginPage/LoginPage.tsx';

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
					<Route path="/friends" element={<Friends />} />
					<Route path="/history" element={<History />} />
					<Route path="/preferences" element={<Preferences />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="*" element={<Home />} />
				</Route>
			</Routes>
			<ToastContainer/>
		</BrowserRouter>
	);
}

export default App;
