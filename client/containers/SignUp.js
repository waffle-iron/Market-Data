import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createUser } from '../actions/userActions'

import SignUpForm from '../components/SignUpForm'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
  handleSubmit = (e) => {
    const { dispatch } = this.props
    e.preventDefault()

    if (this.state.password.length < 8) {
      this.setState({
        password: ''
      })
      return alert('Choose a password longer than 8 characters')
    }

    dispatch(createUser(this.state))
    console.log(this.state)

    this.setState({
      username: '',
      email: '',
      password: ''
    })
  }
  render() {
    return (
      <div>
        <SignUpForm onSubmit={this.handleSubmit} {...this.state}
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
        <span>
          Already have an account?
          <a href='#' onClick={this.props.login}> Log In</a>
        </span>
      </div>
    )
  }
}

export default connect()(SignUp)
