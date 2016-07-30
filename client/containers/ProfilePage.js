import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import { getUserProfile } from '../actions/userActions'

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
    render() {
        const { params } = this.props

        return (
            <div>
                Profile Page For { params.user }
            </div>
        )
    }
}

export default connect()(ProfilePage)
