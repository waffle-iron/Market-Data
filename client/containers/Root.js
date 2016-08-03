import React from 'react'
import CSSModules from 'react-css-modules'

import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Footer from '../components/Footer'

import Style from '../styles/containers/Root'

const Root = (props) => {
    return (
        <div>
            <NavBar />
            { props.children }
            <Footer />
        </div>
    )
}

export default CSSModules(Root, Style)
