import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogsShow = ({ likeBlog, deleteBlog, addBlog, blogFormRef }) => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  const user = useSelector((state) => {
    return state.users
  })

  return (
    <>
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
    </>
  )
}

export default BlogsShow
