import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'boron/FlyModal'
import CSSModules from 'react-css-modules'

import Login from './Login'
import SignUp from './SignUp'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

import Style from '../styles/containers/Root'

class Root extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    const { loggedIn } = this.props
    const { modal } = this.state

    return (
      <div>
        <NavBar onClick={this.handleClick} />
        <Modal ref='modal'>
          { modal && !loggedIn ? (modal === 'login' ? <Login /> : <SignUp onClick={this.handleClick} />) : '' }
        </Modal>
        { this.props.children }
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.user
  return { loggedIn }
}

export default connect()(CSSModules(Root, Style))
