import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountInfo } from 'src/interfaces/AccountInfo';
import axiosInstance from 'src/services/axios';
// import store from 'src/store/store';
// import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from 'src/firebase/firebase';
import { message } from 'antd';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';

export const login = createAsyncThunk('login', async (body: { email: string; password: string; }, { rejectWithValue }) => {
    console.log('log in');

  try {
    const userCredential = await signInWithEmailAndPassword(auth, body.email, body.password);
    openCustomNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Loged in successfully', '');

    return userCredential;
  } catch (error: any) {
    // console.error(error.code, error.message);
    openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Loged in failed', '');
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
    logout: (state, action: PayloadAction<any>) => {
      state.currentAccount = action.payload;
    },
  },
  extraReducers: {
    // post login
    [`${login.pending}`]: (state) => {
      state.loading = true;
    },
    [`${login.rejected}`]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [`${login.fulfilled}`]: (state, action) => {
      state.loading = false;
      state.access_token = action.payload?.user.stsTokenManager.accessToken;

      Cookies.set('access_token', action.payload?.user.stsTokenManager.accessToken);
    },
  },
});

export const { logout } = accountSlice.actions;

const { reducer: accountReducer } = accountSlice;

export default accountReducer;
