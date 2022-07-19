import { commentsForBlog } from '../reducers/commentReducer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SpesificBlog = ({ matchedBlog, createBlog }) => {
  //console.log(matchedBlog)
  if (!matchedBlog) {
    return null
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(commentsForBlog(matchedBlog.id))
  }, [dispatch])

  const comments = useSelector((state) => {
    return state.comments
  })
  console.log(comments)
  const likeBlog = (event) => {
    event.preventDefault()
    createBlog({
      user: matchedBlog.user.username,
      likes: matchedBlog.likes,
      author: matchedBlog.author,
      title: matchedBlog.title,
      url: matchedBlog.url,
      id: matchedBlog.id,
    })
  }
  return (
    <>
      <h2>
        {matchedBlog.title} {matchedBlog.author}
      </h2>
      <a href={matchedBlog.url}>{matchedBlog.url}</a>
      <br></br>
      {matchedBlog.likes} likes <button onClick={likeBlog}>like</button>
      <br></br>
      added by {matchedBlog.user.name}
      <h3>comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </>
  )
}

export default SpesificBlog

/*
  const getComment = async (id) => {
    try {
      dispatch(commentsForBlog(id))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error))
    }
  }
*/
