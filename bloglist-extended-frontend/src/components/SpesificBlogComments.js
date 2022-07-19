const SpesificBlogComments = ({ comments }) => {
  return (
    <>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </>
  )
}

export default SpesificBlogComments
