import { commentsForBlog } from '../reducers/commentReducer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SpesificBlogComments from './SpesificBlogComments'
import { Button } from 'react-bootstrap'

const SpesificBlog = ({ matchedBlog, createBlog, createComment }) => {
  const [comment, setComment] = useState('')
  //console.log(matchedBlog)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!matchedBlog) {
      return
    }
    dispatch(commentsForBlog(matchedBlog.id))
  }, [dispatch, matchedBlog])

  const comments = useSelector((state) => {
    return state.comments
  })
  if (!matchedBlog) {
    return null
  }

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

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()

    createComment({
      comment: comment,
      blog: matchedBlog.id,
    })
    setComment('')
  }

  return (
    <>
      <h2>
        {matchedBlog.title} by {matchedBlog.author}
      </h2>
      <a href={matchedBlog.url}>{matchedBlog.url}</a>
      <br></br>
      {matchedBlog.likes} likes{' '}
      <Button variant="primary" onClick={likeBlog}>
        like
      </Button>
      <br></br>
      added by {matchedBlog.user.name}
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
        ></input>{' '}
        <Button variant="primary" type="submit">
          add comment
        </Button>
      </form>
      <SpesificBlogComments comments={comments} />
    </>
  )
}

export default SpesificBlog
