import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, showPassword} = props
  const {website, username, password, id} = passwordDetails

  const initial = username.slice(0, 1).toUpperCase()

  const onDelete = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item-container">
      <div className="flex">
        <div className="initial-container">
          <p className="initial">{initial}</p>
        </div>
        <div className="content">
          <h3 className="website">{website}</h3>
          <p className="username">{username}</p>
          {!showPassword && (
            <img
              className="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
          {showPassword && <p className="password-text">{password}</p>}
        </div>
      </div>
      <img
        className="delete-icon"
        alt="delete"
        onClick={onDelete}
        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
      />
    </li>
  )
}

export default PasswordItem
