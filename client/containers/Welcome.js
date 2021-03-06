import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'boron/FlyModal'
import CSSModules from 'react-css-modules'

import HeroSection from '../components/HeroSection'
import IconSection from '../components/IconSection'
import Login from './Login'
import SignUp from './SignUp'

import Style from '../styles/containers/Welcome'

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    const { dispatch, loggedIn } = this.props

    return (
      <div styleName='root'>
        <Modal ref='modal'>
          { !loggedIn ? <SignUp close={() => this.refs.modal.hide()} /> : '' }
        </Modal>
        <HeroSection onClick={() => this.refs.modal.show()} />
        <IconSection />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.user
  return { loggedIn }
}

export default connect(mapStateToProps)(CSSModules(Welcome, Style))
