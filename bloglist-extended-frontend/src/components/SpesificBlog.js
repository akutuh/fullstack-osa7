const SpesificBlog = ({ matchedBlog, createBlog }) => {
  //console.log(matchedBlog)
  if (!matchedBlog) {
    return null
  }
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
    </>
  )
}

export default SpesificBlog
