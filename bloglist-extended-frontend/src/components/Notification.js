import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notifications }) => {
    if (notifications === null) {
      return null
    } else {
      return notifications
    }
  })

  if (notification === null) {
    return null
  } else if (
    notification.includes('wrong credentials') ||
    notification.includes('creation failed') ||
    notification.includes('allowed')
  ) {
    return (
      <Alert variant="danger" className="error">
        {notification}
      </Alert>
    )
  } else {
    return (
      <Alert variant="success" className="error">
        {notification}
      </Alert>
    )
  }
}

export default Notification
