import Header from '../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Footer } from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth.js';

export const Registration = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async values => {
		const data = await dispatch(fetchRegister(values));
		if (!data.payload) {
			return alert('Не удалось зарегистрироваться!!!');
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
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your name'
							{...register('fullName', { required: 'Enter your name' })}
						/>
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
						Register
					</Button>
				</Form>
			</div>
			<Footer />
		</>
	);
};
