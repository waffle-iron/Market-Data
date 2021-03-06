import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import { getUserProfile } from '../actions/userActions'

import Loader from '../atoms/Loader'

class ProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }
  componentWillMount() {
    const { dispatch, params } = this.props

    dispatch(getUserProfile(params.user))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        loading: false
      })
    }
  }
  render() {
    const { loading } = this.state
    const { params, profileData } = this.props

    return (
      <div>
        { loading ? <Loader /> : <img src={profileData.avatar} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { profileData } = state.user
  return { profileData }
}

export default connect(mapStateToProps)(ProfilePage)
