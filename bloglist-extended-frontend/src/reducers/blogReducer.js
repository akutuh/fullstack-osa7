import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      const id = action.payload.id
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      const newState = state.map((b) => (b.id !== id ? b : changedBlog))
      return newState.sort((a, b) => b.likes - a.likes)
    },
    blogDelete(state, action) {
      const id = action.payload.id
      const newState = state.filter((blog) => blog.id !== id)
      return newState.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    newBlog.user = { username: user.username, id: newBlog.user }
    dispatch(appendBlog(newBlog))
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const newLike = await blogService.like(blog)
    dispatch(likeBlog(newLike))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch(blogDelete(blog))
  }
}

export const { setBlogs, appendBlog, likeBlog, blogDelete } = blogSlice.actions
export default blogSlice.reducer
