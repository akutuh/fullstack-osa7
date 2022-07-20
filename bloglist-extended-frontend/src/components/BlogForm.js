import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create a new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Label htmlFor="basic-url">Title</Form.Label>
        <InputGroup className="mb-3">
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            aria-label="Title"
            id="title"
          />
        </InputGroup>
        <Form.Label htmlFor="basic-url">Author</Form.Label>
        <InputGroup className="mb-3">
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            aria-label="Author"
            id="author"
          />
        </InputGroup>
        <Form.Label htmlFor="basic-url">Url</Form.Label>
        <InputGroup className="mb-3">
          <input
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            aria-label="Url"
            id="url"
          />
        </InputGroup>
        <Button id="create-button" type="submit">
          create
        </Button>
      </Form>
    </>
  )
}

export default BlogForm
