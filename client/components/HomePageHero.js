import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/HomePageHero'

const HomePageHero = (props) => {
  return (
    <div styleName='root'>
      <img styleName='hero-img' src='http://www.market-data.nl/images/data2.jpg' />
      <div styleName='container'>
        <h1 styleName='hero-text'>Learn. Play. Conquer.</h1>
        <h2>
          <a styleName='join-button'>Join</a>
        </h2>
        <h3>
          Hone your investing skills on our trading
          platform powered by real-time market data
        </h3>
      </div>
    </div>
  )
}

export default CSSModules(HomePageHero, Style)
