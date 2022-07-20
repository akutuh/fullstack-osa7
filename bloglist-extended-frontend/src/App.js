import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import UsersView from './components/UsersView'
import BlogsShow from './components/Blogs'
import SpesificUser from './components/SpesificUser'
import SpesificBlog from './components/SpesificBlog'

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
import { createComment } from './reducers/commentReducer'

import { Routes, Route, useMatch } from 'react-router-dom'

import { Button, Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const App = () => {
  const user = useSelector((state) => {
    return state.users
  })
  const blogs = useSelector((state) => {
    return state.blogs
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    dispatch(getUserFromJSON(loggedUserJSON))
  }, [dispatch])

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
      dispatch(setNotification(`Welcome ${user.username}`))
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

  const addComment = async (commentObject) => {
    try {
      dispatch(createComment(commentObject))
    } catch (exception) {
      dispatch(setNotification('creation failed (comment)'))
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

  const match = useMatch('/users/:id')
  const blogsMadeBy = match
    ? blogs.filter((blog) => blog.user.id === match.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const matchedBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  return (
    <div className="container">
      {user === null ? (
        <div>
          <h1>Log in to application</h1>
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
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="">Blog app</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <LinkContainer to="/">
                    <Nav.Link>blogs</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/users">
                    <Nav.Link>users</Nav.Link>
                  </LinkContainer>
                  <Nav.Link>{user.name} logged in </Nav.Link>
                  <Button variant="secondary" onClick={handleLogout}>
                    logout
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Notification />
          <Routes>
            <Route path="/users" element={<UsersView />} />
            <Route
              path="/users/:id"
              element={<SpesificUser blogsMadeBy={blogsMadeBy} />}
            />
            <Route
              path="/blogs/:id"
              element={
                <SpesificBlog
                  matchedBlog={matchedBlog}
                  createBlog={likeBlog}
                  createComment={addComment}
                />
              }
            />
            <Route
              path="/"
              element={
                <BlogsShow
                  addBlog={addBlog}
                  deleteBlog={deleteBlog}
                  likeBlog={likeBlog}
                  blogFormRef={blogFormRef}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
