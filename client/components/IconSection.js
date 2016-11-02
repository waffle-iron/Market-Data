import React from 'react'

import { icon_section } from '../assets/site_text.json'

import IconBlock from '../atoms/IconBlock'

const IconSection = (props) => {
  return (
    <div className='container'>
      <div className='section'>
        <div className='row'>
          { icon_section.map(block => <IconBlock {...block} />) }
        </div>
      </div>
      <br />
    </div>
  )
}

export default IconSection
