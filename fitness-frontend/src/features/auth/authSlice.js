import { createSlice } from '@reduxjs/toolkit'
import { getStoredToken, getStoredUser, saveAuthData, clearAuthData } from '../../utils/auth'

const initialState = {
  token: getStoredToken(),
  user: getStoredUser(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload
      state.token = token
      state.user = user
      saveAuthData(token, user)
    },
    logout: (state) => {
      state.token = null
      state.user = null
      clearAuthData()
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer