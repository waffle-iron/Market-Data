import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import Style from '../styles/containers/Home'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }
  render() {
    const { dispatch, loggedIn } = this.props

    return (
      <div>
        Welcome Home
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.user
  return { loggedIn }
}

export default connect(mapStateToProps)(CSSModules(Home, Style))
