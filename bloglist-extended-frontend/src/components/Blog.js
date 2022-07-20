import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Row, Col } from 'react-bootstrap'

const Blog = ({ blog, createBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideIfNotAddedByLoggedUser = { display: removeVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (blog.user.username === user.username) {
      toggleRemoveVisibility()
    }
  }

  const toggleRemoveVisibility = () => {
    setRemoveVisible(!removeVisible)
  }

  const likeBlog = (event) => {
    event.preventDefault()
    createBlog({
      user: blog.user.username,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog({
      user: blog.user.username,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
    })
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Container>
          <Row>
            <Col>
              <Card className="blog mt-1">
                <Link to={`/blogs/${blog.id}`}>
                  <Card.Body>
                    {blog.title} {blog.author}{' '}
                  </Card.Body>
                </Link>
                <Button variant="info" onClick={toggleVisibility}>
                  view
                </Button>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col>
            <Card style={showWhenVisible}>
              <Card.Body className="blogAll">
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}{' '}
                </Link>
                <br></br>
                <a href={blog.url}>{blog.url}</a>
                <br></br>
                {blog.likes} <Button onClick={likeBlog}>like</Button>
                <br></br>
                {blog.user.username}
                <div style={hideIfNotAddedByLoggedUser}>
                  <Button variant="danger" onClick={deleteBlog}>
                    remove
                  </Button>
                </div>
              </Card.Body>
              <Button variant="info" onClick={toggleVisibility}>
                hide
              </Button>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Blog
