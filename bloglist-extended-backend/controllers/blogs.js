const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const getBlogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 2,
  })
  response.status(200).json(getBlogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const getBlog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
  })
  response.status(200).json(getBlog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const blog1 = new Blog(request.body)
  if (!blog1.title || !blog1.url) {
    return response.status(400).json(blog1)
  }

  const user = await User.findById(request.decodedToken.id)
  console.log(user.username)
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: request.decodedToken.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog === null) {
      return response.status(400).json({ error: 'no blog for this id' })
    }

    if (blog.user.toString() === request.decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(200).end()
    } else {
      return response
        .status(400)
        .json({ error: 'you are not allowed to delete this blog' })
    }
  }
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  //console.log(body.likes)
  const blog = {
    likes: body.likes + 1,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  console.log('asd', updatedBlog)
  response.status(200).json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const comment = new Comment({
    comment: body.comment,
    blog: request.params.id,
  })

  const savedComment = await comment.save()

  response.status(201).json(savedComment)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const getComments = await Comment.find({ blog: request.params.id })
  response.status(200).json(getComments)
})

module.exports = blogsRouter
