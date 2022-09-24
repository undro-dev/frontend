import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Footer } from '../components/Footer';
import deBlock from '../assets/icons/deBlock.svg';
import block from '../assets/icons/block.svg';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAllUsers,
	fetchBlockUser,
	fetchChangeChoice,
	fetchChangeChoiceAll,
	fetchDeleteUsers,
	fetchUnBlockUser,
} from '../redux/slices/users.js';

import Header from '../components/Header';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import { selectCurrentUser, logout } from '../redux/slices/auth.js';

export const Users = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data } = useSelector(selectCurrentUser);

	const { allUsers } = useSelector(state => state.users);

	const handlerCheckBox = (e, id) => {
		dispatch(fetchChangeChoice({ id, isChoice: e.target.checked }));
	};
	const toBlockUser = () => {
		const selectedUsers = allUsers.filter(user => user.isChoice === true);
		if (selectedUsers.find(user => user._id === data._id)) {
			dispatch(logout());
			window.localStorage.removeItem('token');
			navigate('/login');
		}

		dispatch(fetchBlockUser());
	};
	const toUnlockUser = () => {
		dispatch(fetchUnBlockUser());
	};

	const handlerCheckAll = e => {
		dispatch(fetchChangeChoiceAll({ isChoice: e.target.checked }));
	};

	const deleteUsers = () => {
		const selectedUsers = allUsers.filter(user => user.isChoice === true);

		if (selectedUsers.find(user => user._id === data._id)) {
			dispatch(logout());
			window.localStorage.removeItem('token');
			navigate('/login');
		}
		dispatch(fetchDeleteUsers());
	};
	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch]);

	return (
		<>
			<Header />
			<div className='container-sm p-3 '>
				<Container className='d-flex justify-content-around'>
					<Button variant='dark' onClick={deleteUsers}>
						DELETE
					</Button>
					<img onClick={toBlockUser} src={block} alt='block' />
					<img onClick={toUnlockUser} src={deBlock} alt='deBlock' />
				</Container>
				<Table
					responsive
					striped
					bordered
					hover
					variant='dark'
					size='sm'
					className='mt-2'
				>
					<thead>
						<tr>
							<th>
								{<InputGroup.Checkbox onChange={e => handlerCheckAll(e)} />}
							</th>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Registration date</th>
							<th>Last login</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{allUsers.map(user => (
							<tr key={user._id}>
								<td>
									{
										<InputGroup.Checkbox
											checked={user.isChoice}
											onChange={e => handlerCheckBox(e, user._id)}
										/>
									}
								</td>
								<td>{user._id}</td>
								<td>{user.fullName}</td>
								<td>{user.email}</td>
								<td>
									<Moment format='YYYY-MM-DD HH:mm'>{user.createdAt}</Moment>
								</td>

								<td>
									<Moment format='YYYY-MM-DD HH:mm'>{user.lastLogin}</Moment>
								</td>
								<td>{user.isBlock ? 'Block' : null}</td>
							</tr>
						))}
						s
					</tbody>
				</Table>
			</div>
			<Footer />
		</>
	);
};
