import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import { createUser } from '../actions/userActions'

import SignUpForm from '../components/SignUpForm'

import Style from '../styles/containers/SignUp'

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

    dispatch(createUser(this.state))
  }
  render() {
    return (
      <div styleName='root'>
        <SignUpForm onSubmit={this.handleSubmit}
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
        <span>
          Already have an account?
          <a onClick={this.props.login}>Log In</a>
        </span>
      </div>
    )
  }
}

export default connect()(CSSModules(SignUp, Style))
