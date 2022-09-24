import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchUserAuth, selectIsAuth } from '../redux/slices/auth.js';
import { toast } from 'react-toastify';
import { Footer } from '../components/Footer';

export const Login = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const message = useSelector(state => state.auth.message);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async values => {
		const data = await dispatch(fetchUserAuth(values));
		if (!data.payload.data) {
			return toast(message);
		}
		if (data.payload.token)
			window.localStorage.setItem('token', data.payload.token);
	};

	if (isAuth) {
		return <Navigate to={'/users'} />;
	}
	return (
		<>
			<Header />
			<div className='container-sm d-flex justify-content-center'>
				<Form onSubmit={handleSubmit(onSubmit)} className='w-50'>
					<Form.Group className='mb-3 mt-3' controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter email'
							{...register('email', { required: 'Enter your email' })}
						/>
						<div className='d-flex flex-column'>
							<Form.Text className='text-muted'>
								We'll never share your email with anyone else.
							</Form.Text>
						</div>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							{...register('password', { required: 'Enter your password' })}
						/>
					</Form.Group>
					<Form.Group
						className='mb-3'
						controlId='formBasicCheckbox'
					></Form.Group>
					<Button variant='primary' type='submit'>
						Enter
					</Button>
				</Form>
			</div>
			<Footer />
		</>
	);
};
