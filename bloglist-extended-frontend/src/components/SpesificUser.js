const SpesificUser = ({ blogsMadeBy }) => {
  if (blogsMadeBy.length === 0) {
    return null
  } else {
    return (
      <>
        <h2>{blogsMadeBy[0].user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {blogsMadeBy.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </>
    )
  }
}

export default SpesificUser
