import React from 'react'
import CSSModules from 'react-css-modules'

import Style from '../styles/components/Footer'

const Footer = (props) => {
  return (
    <div styleName='root'>
      © Copyright 2016 Radiux. All Rights Reserved
    </div>
  )
}

export default CSSModules(Footer, Style)
