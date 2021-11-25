import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountInfo } from 'src/interfaces/AccountInfo';
import axiosInstance from 'src/services/axios';
// import store from 'src/store/store';
// import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { auth } from 'src/firebase/firebase';
import { message } from 'antd';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';

export const login = async (body: { email: string; password: string; }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, body.email, body.password);
    openCustomNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Loged in successfully', '');
    return true;
  } catch (error: any) {
    // console.error(error.code, error.message);
    openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Loged in failed', '');
    return false;
  };
};

export const signout = createAsyncThunk('login', async (body, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Sign out failed', '');
    return rejectWithValue(error.response.data);
  };
});

export const signup = createAsyncThunk('signup', async (body: any, { rejectWithValue }) => {
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
    handleLogin: (state, action: PayloadAction<any>) => {
      state.access_token = action.payload?.accessToken;
      Cookies.set('access_token', action.payload?.accessToken);
    },
    handleLogout: (state, action: PayloadAction<any>) => {
      state.access_token = '';
      Cookies.remove('access_token');
    },
  },
  extraReducers: {
  },
});

export const { handleLogin, handleLogout } = accountSlice.actions;

const { reducer: accountReducer } = accountSlice;

export default accountReducer;
