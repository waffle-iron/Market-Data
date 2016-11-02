import React, { Component } from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../actions/userActions'

import LoginForm from '../components/LoginForm'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }
  handleSubmit = (e) => {
    const { dispatch } = this.props
    e.preventDefault()

    dispatch(loginUser(this.state))
  }
  render() {
    return (
      <div>
        <LoginForm onSubmit={this.handleSubmit}
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
      </div>
    )
  }
}

export default connect()(Login)
