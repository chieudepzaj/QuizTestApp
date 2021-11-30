import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from 'src/services/axios';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from 'src/firebase/firebase';
import { NOTIFICATION_TYPE, openCustomNotificationWithIcon } from 'src/components/notification';

const initialState = {
  quiz: {} as any,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    handleTakeQuiz: (state, action: PayloadAction<any>) => {
      state.quiz = action.payload;
    },
    handleEndQuiz: (state, action: PayloadAction<any>) => {
      state = initialState;
    },
  },
  extraReducers: {},
});

export const { handleTakeQuiz } = quizSlice.actions;

const { reducer: quizReducer } = quizSlice;

export default quizReducer;
