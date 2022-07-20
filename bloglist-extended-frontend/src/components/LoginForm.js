import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          id="username"
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          id="password"
        />
        <Button className="blog mt-1" id="login-button" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
