import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAllUsers = createAsyncThunk(
	'users/fetchAllUsers',
	async () => {
		const { data } = await axios.get('/users');
		return data;
	}
);
export const fetchBlockUser = createAsyncThunk('users/blockUsers', async () => {
	const { data } = await axios.get('/users/blockUsers');
	return data;
});
export const fetchUnBlockUser = createAsyncThunk(
	'users/fetchUnBlockUser',
	async () => {
		const { data } = await axios.get('/users/unBlockUsers');
		return data;
	}
);

export const fetchChangeChoice = createAsyncThunk(
	'users/fetchChangeChoice',
	async params => {
		const { data } = await axios.patch(`/users/${params.id}`, {
			isChoice: params.isChoice,
		});
		return data;
	}
);

export const fetchChangeChoiceAll = createAsyncThunk(
	'users/fetchChangeChoiceAll',
	async params => {
		const { data } = await axios.post(`/users/all`, {
			params,
		});
		return data;
	}
);

export const fetchDeleteUsers = createAsyncThunk(
	'users/fetchDeleteUsers',
	async () => {
		const { data } = await axios.get('/users/delete');
		return data;
	}
);

const initialState = {
	allUsers: [],
	status: 'loading',
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		//get all users
		[fetchAllUsers.pending]: state => {
			state.status = 'loading';
		},
		[fetchAllUsers.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.allUsers = action.payload;
		},
		[fetchAllUsers.rejected]: state => {
			state.allUsers = [];
			state.status = 'error';
		},
		//get block users
		[fetchBlockUser.pending]: state => {
			state.status = 'loading';
		},
		[fetchBlockUser.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.allUsers = action.payload;
		},
		[fetchBlockUser.rejected]: state => {
			state.allUsers = [];
			state.status = 'error';
		},
		[fetchUnBlockUser.pending]: state => {
			state.status = 'loading';
		},
		[fetchUnBlockUser.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.allUsers = action.payload;
		},
		[fetchUnBlockUser.rejected]: state => {
			state.allUsers = [];
			state.status = 'error';
		},
		[fetchChangeChoice.pending]: state => {
			state.status = 'loading';
		},
		[fetchChangeChoice.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.allUsers = action.payload;
		},
		[fetchChangeChoice.rejected]: state => {
			state.status = 'error';
		},
		[fetchDeleteUsers.pending]: state => {
			state.status = 'loading';
		},
		[fetchDeleteUsers.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.allUsers = action.payload;
		},
		[fetchDeleteUsers.rejected]: state => {
			state.status = 'error';
		},
		[fetchChangeChoiceAll.pending]: state => {
			state.status = 'loading';
		},
		[fetchChangeChoiceAll.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.allUsers = action.payload;
		},
		[fetchChangeChoiceAll.rejected]: state => {
			state.status = 'error';
		},
	},
});

export const usersReducer = usersSlice.reducer;
