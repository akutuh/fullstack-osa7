import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
    comments: commentReducer,
  },
})

export default store
