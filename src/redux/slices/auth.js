import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserAuth = createAsyncThunk(
	'auth/fetchUserData',
	async params => {
		try {
			const { data } = await axios.post('/auth/login', params);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async params => {
		const { data } = await axios.post('/auth/register', params);
		return data;
	}
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
	const { data } = await axios.get('/auth/me');
	return data;
});

const initialState = {
	data: null,
	status: 'loading',
	message: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null;
		},
	},
	extraReducers: {
		//Login
		[fetchUserAuth.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchUserAuth.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload.data;
			state.message = action.payload.message;
		},
		[fetchUserAuth.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
		//Check auth
		[fetchAuthMe.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchAuthMe.rejected]: state => {
			state.data = null;
			state.status = 'error';
		},
		//Registration
		[fetchRegister.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchRegister.rejected]: state => {
			state.data = null;
			state.status = 'error';
		},
	},
});
export const selectIsAuth = state => Boolean(state.auth.data);
export const selectCurrentUser = state => state.auth;
export const authReducer = authSlice.reducer;
export const { logout, findCurrentUser } = authSlice.actions;
