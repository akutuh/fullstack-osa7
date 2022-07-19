import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserView = ({ user, userCount }) => {
  console.log(user)
  return (
    <tr>
      <td scope="row">
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{userCount}</td>
    </tr>
  )
}

const UsersView = () => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  const getOccurrence = (array, value) => {
    return array.filter((v) => v.user.username === value).length
  }

  const newArray = blogs.map((blog) => {
    return blog.user
  })

  const uniqueIds = []

  const unique = newArray.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id)

    if (!isDuplicate) {
      uniqueIds.push(element.id)

      return true
    }

    return false
  })

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {unique.map((user) => (
            <UserView
              key={user.id}
              user={user}
              userCount={getOccurrence(blogs, user.username)}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UsersView
