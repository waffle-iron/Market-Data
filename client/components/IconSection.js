import React from 'react'

import IconBlock from '../atoms/IconBlock'

const IconSection = (props) => {
  return (
    <div className='container'>
      <div className='section'>
        <div className='row'>
          <IconBlock icon='flash_on' />
          <IconBlock icon='group' />
          <IconBlock icon='settings' />
        </div>
      </div>
      <br />
      <div className='section' />
    </div>
  )
}

export default IconSection
