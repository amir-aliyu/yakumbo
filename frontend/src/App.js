import Home from './components/Home/Home.tsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Routing/Layout.tsx';
import Friends from './components/Friends/Friends.tsx';
import Preferences from './components/Preferences/Preferences.tsx';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/friends" element={<Friends />} />
				<Route path="/preferences" element={<Preferences />} />
				<Route path="*" element={<Home />} />
				</Route>
			</Routes>
			<ToastContainer/>
		</BrowserRouter>
	);
}

export default App;
