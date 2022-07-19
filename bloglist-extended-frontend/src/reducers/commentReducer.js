import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const commentsForBlog = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id)
    dispatch(setComments(comments))
  }
}

export const createComment = (content) => {
  return async (dispatch) => {
    const newComment = await blogService.createComm(content)
    dispatch(appendComment(newComment))
  }
}

export const { setComments, appendComment } = commentSlice.actions
export default commentSlice.reducer
