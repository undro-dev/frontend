import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../redux/slices/auth';

const Header = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const onClickLogout = () => {
		dispatch(logout());
		window.localStorage.removeItem('token');
	};

	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand>Task 4</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						{isAuth ? (
							<Nav.Link onClick={onClickLogout} as={Link} to={'/login'}>
								Logout
							</Nav.Link>
						) : (
							<Nav.Link as={Link} to={'/login'}>
								Login
							</Nav.Link>
						)}
						{isAuth ? null : (
							<Nav.Link as={Link} to={'/registration'}>
								Registration
							</Nav.Link>
						)}

						<Nav.Link as={Link} to={isAuth ? '/users' : '/login'}>
							Users
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
