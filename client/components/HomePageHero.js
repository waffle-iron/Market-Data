import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/HomePageHero'

const HomePageHero = (props) => {
  return (
    <div styleName='root'>
      <h1 styleName='hero-text'>Learn. Play. Conquer.</h1>
      <h2>
        <a styleName='join-button' href='#' onClick={props.onClick} value='signup'>
          Start Trading
        </a>
      </h2>
    </div>
  )
}

export default CSSModules(HomePageHero, Style)
