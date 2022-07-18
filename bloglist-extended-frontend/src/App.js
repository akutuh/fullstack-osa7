import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  addLike,
  removeBlog,
} from './reducers/blogReducer'
import { getUserFromJSON, newUser } from './reducers/userReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const blogs = useSelector((state) => {
    return state.blogs
  })
  const user = useSelector((state) => {
    return state.users
  })
  //const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    dispatch(getUserFromJSON(loggedUserJSON))
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   setUser(user)
    //   blogService.setToken(user.token)
    // }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(newUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false)
  }

  const addBlog = async (blogObject) => {
    console.log('user', user)
    try {
      dispatch(createBlog(blogObject, user))
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5
        )
      )
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification('creation failed'))
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      dispatch(addLike(blogObject))
    } catch (exception) {
      dispatch(setNotification('creation failed (like)'))
    }
  }

  const deleteBlog = async (blogObject) => {
    try {
      if (
        window.confirm(
          `Remove blog ${blogObject.title} by ${blogObject.author}?`
        )
      ) {
        dispatch(removeBlog(blogObject))
        dispatch(
          setNotification(
            `blog ${blogObject.title} by ${blogObject.author} was removed`
          )
        )
      }
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error))
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          <Notification />
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
            />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout}> logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              createBlog={likeBlog}
              removeBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
