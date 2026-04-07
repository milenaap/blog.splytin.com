import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking', // 'checking', 'not-authenticated', 'authenticated' 
  token: null,
  email: null,
  displayName: null,
  image_url: null,
  roles: [],
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.token = payload.token;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.image_url = payload.image_url;
      state.roles = payload.roles || [];
      state.errorMessage = null;

      // Guardar en localStorage para que persista
      localStorage.setItem("token_blog_splytin_com", payload.token);
    },

    logout: (state, payload) => {
      state.status = 'not-authenticated';
      state.token = null;
      state.email = null;
      state.displayName = null;
      state.image_url = null;
      state.roles = [];
      state.errorMessage = payload?.errorMessage;

      // Eliminar de localStorage
      localStorage.removeItem("token_blog_splytin_com");
    },

    setErrorMessage: (state, action) => {
      state.status = 'not-authenticated';
      state.errorMessage = action.payload;
    },

    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
});

// Action creators generados automáticamente por cada reducer
export const { login, logout, checkingCredentials, setErrorMessage } = authSlice.actions;
