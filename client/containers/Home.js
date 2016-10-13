import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'boron/FlyModal'
import CSSModules from 'react-css-modules'

import Login from './Login'
import SignUp from './SignUp'
import HomePageHero from '../components/HomePageHero'

import Style from '../styles/containers/Home'

class Home extends Component {
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
    const { dispatch, loggedIn } = this.props
    const { modal } = this.state

    return (
      <div styleName='root'>
        <Modal ref='modal'>
          { modal && !loggedIn ? (modal === 'login' ? <Login /> : <SignUp />) : '' }
        </Modal>
        <HomePageHero onClick={this.handleClick} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.user
  return { loggedIn }
}

export default connect(mapStateToProps)(CSSModules(Home, Style))
