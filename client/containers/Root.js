import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'boron/FlyModal'
import CSSModules from 'react-css-modules'

import Login from './Login'
import SignUp from './SignUp'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Footer from '../components/Footer'

import Style from '../styles/containers/Root'

class Root extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      modal: ''
    }
  }
  handleClick = (e) => {
    this.setState({
      modal: e.target.value
    })
    this.refs.modal.show()
  }
  render() {
    const { loggedIn, modal } = this.state

    return (
      <div>
        <NavBar onClick={this.handleClick} />
        <Modal ref='modal'>
          { modal && !loggedIn ? (modal === 'login' ? <Login /> : <SignUp />) : '' }
        </Modal>
        { this.props.children }
        <Footer />
      </div>
    )
  }
}

export default connect()(CSSModules(Root, Style))
