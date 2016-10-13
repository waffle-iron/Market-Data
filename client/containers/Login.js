import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import LoginForm from '../components/LoginForm'

import Style from '../styles/containers/Login'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()

    console.log(this.state)
  }
  render() {
    return (
      <div styleName='root'>
        <LoginForm onSubmit={this.handleSubmit}
          onChange={(e) => this.setState({ [e.target.name]: e.target.value })} />
      </div>
    )
  }
}

export default connect()(CSSModules(Login, Style))
