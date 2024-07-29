import PropTypes from 'prop-types'
import { Toggable } from './Toggable'

export const LoginForm = ({ handleSubmit, ...props }) => {
  return (
    <Toggable buttonLabel={'Show login form'}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="Username"
            value={props.username}
            onChange={props.handleChangeUsername}
          />
        </div>
        <div>
          <input
            type="password"
            name="Password"
            value={props.password}
            onChange={props.handleChangePassword}
          />
        </div>
        <button>Login</button>
      </form>
    </Toggable>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,
}
