import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { cookieName } from 'src/constants/cookieNameVar';

const initialState = {
  quiz: {} as any,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    handleTakeQuiz: (state, action: PayloadAction<any>) => {
      state.quiz = action.payload;
      Cookies.set(cookieName.CURRENT_QUIZ, JSON.stringify(action.payload));
    },
    handleEndQuiz: () => initialState,
  },
  extraReducers: {},
});

export const { handleTakeQuiz } = quizSlice.actions;

const { reducer: quizReducer } = quizSlice;

export default quizReducer;
