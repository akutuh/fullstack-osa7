import { useSelector } from 'react-redux'

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
    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }

    return (
      <div className="error" style={errorStyle}>
        {notification}
      </div>
    )
  } else {
    const errorStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }

    return (
      <div className="error" style={errorStyle}>
        {notification}
      </div>
    )
  }
}

export default Notification
