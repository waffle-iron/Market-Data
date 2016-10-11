import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

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
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()

        console.log(this.state)
    }
    render() {
        return (
            <div styleName='root'>
                <SignUpForm onSubmit={this.handleSubmit}
                    onChange={this.handleInputChange}/>
                <span>
                    Already have an account?
                    <a onClick={this.props.login}>Log In</a>
                </span>
            </div>
        )
    }
}

export default connect()(CSSModules(SignUp, Style))
