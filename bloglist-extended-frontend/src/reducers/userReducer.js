import { createSlice } from '@reduxjs/toolkit'
//import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const getUserFromJSON = (loggedUser) => {
  return async (dispatch) => {
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}
export const newUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
