import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration.jsx';
import { Users } from './pages/Users.jsx';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/slices/auth';
import { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAuthMe());
	}, []);

	return (
		<>
			<Routes>
				<Route path='/' element={<Users />} />
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/users' element={<Users />} />
			</Routes>
			<ToastContainer position='top-right' />
		</>
	);
}

export default App;
