import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    },
  },
})

let timeoutID
export const setNotification = (content) => {
  return async (dispatch) => {
    dispatch(showNotification(content))
    if (timeoutID) clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
