import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

const initialState = {
  website: '',
  username: '',
  password: '',
  passwordList: [],
  searchQuery: '',
  showPassword: false,
}

class PasswordManager extends Component {
  state = initialState

  addPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      username: '',
      website: '',
      password: '',
    }))
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const newPasswordList = passwordList.filter(each => each.id !== id)

    this.setState({passwordList: newPasswordList})
  }

  onWebsiteInputChange = event => {
    this.setState({website: event.target.value})
  }

  onUsernameInputChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInputChange = event => {
    this.setState({password: event.target.value})
  }

  onSearchInputChange = event => {
    this.setState({searchQuery: event.target.value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {
      website,
      username,
      password,
      passwordList,
      searchQuery,
      showPassword,
    } = this.state

    const filteredList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const noPasswords = passwordList.length === 0 || filteredList.length === 0

    return (
      <div className="body">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="add-password-section">
          <div className="decorative-image-container">
            <img
              className="decorative-image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            />
          </div>
          <div className="add-password-form">
            <form className="form" onSubmit={this.addPassword}>
              <h3 className="form-title">Add New Password</h3>
              <div className="input-container">
                <img
                  className="input-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onWebsiteInputChange}
                />
              </div>
              <div className="input-container">
                <img
                  className="input-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onUsernameInputChange}
                />
              </div>
              <div className="input-container">
                <img
                  className="input-icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onPasswordInputChange}
                />
              </div>
              <div className="add-btn-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="show-password-section">
          <div className="search-section">
            <div className="pass-count-section">
              <p>
                Your Password <span>{passwordList.length}</span>
              </p>
            </div>
            <div className="search-input-container">
              <img
                className="search-icon"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={this.onSearchInputChange}
                className="search"
              />
            </div>
          </div>
          <hr />
          <div className="show-password-text-section">
            <input
              type="checkbox"
              className="checkbox"
              onClick={this.onClickCheckbox}
            />
            <p className="show-password-text">Show Passwords</p>
          </div>

          <div className="display-password-section">
            {noPasswords && (
              <div>
                <div className="decorative-image-container">
                  <img
                    className="decorative-image"
                    alt="no passwords"
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  />
                  <h3>No Passwords</h3>
                </div>
              </div>
            )}
            {!noPasswords &&
              filteredList.map(each => (
                <PasswordItem
                  passwordDetails={each}
                  key={each.id}
                  showPassword={showPassword}
                  deletePassword={this.deletePassword}
                />
              ))}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
