import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountInfo } from 'src/interfaces/AccountInfo';
import axiosInstance from 'src/services/axios';
import store from 'src/store/store';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

export const postLogin = createAsyncThunk('admin/postLogin', async (body: any, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/auth/admin/login', body);

    return res;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const initialState = {
  currentAccount: <IAccountInfo>{},
  error: '',
  loading: false,
  access_token: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state, action: PayloadAction<any>) => {
      state.currentAccount = action.payload;
    },
  },
  extraReducers: {
    // post login
    [`${postLogin.pending}`]: (state) => {
      state.loading = true;
    },
    [`${postLogin.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${postLogin.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.access_token = action.payload?.data.access_token;
      state.currentAccount = {
        ...action.payload.data,
      };

      Cookies.set('access_token', action.payload?.data.access_token);
    },
  },
});

export const { logout } = accountSlice.actions;

const { reducer: accountReducer } = accountSlice;

export default accountReducer;
