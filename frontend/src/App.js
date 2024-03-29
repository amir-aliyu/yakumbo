import Home from './components/Home/Home.tsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div>
			<title>Plant Project WebApp</title>
			<Home/>
			<ToastContainer />
		</div>
	);
}

export default App;
