import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'

import HomePageHero from '../components/HomePageHero'

import Style from '../styles/containers/Home'

class Home extends Component {
    render() {
        const { dispatch } = this.props

        return (
            <div styleName='root'>
                <HomePageHero />
            </div>
        )
    }
}

export default connect()(CSSModules(Home, Style))
