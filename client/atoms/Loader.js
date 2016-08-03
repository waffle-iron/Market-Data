import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/atoms/Loader'

const Loader = (props) => {
    return (
        <div styleName='loader'>
            <div styleName='segment-holder'>
                <div styleName='one' />
            </div>
            <div styleName='segment-holder'>
                <div styleName='two' />
            </div>
            <div styleName='segment-holder'>
                <div styleName='three' />
            </div>
            <div styleName='segment-holder'>
                <div styleName='four' />
            </div>
        </div>
    )
}

export default CSSModules(Loader, Style)
