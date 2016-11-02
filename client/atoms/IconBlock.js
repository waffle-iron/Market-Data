import React from 'react'

const IconBlock = (props) => {
  return (
    <div className='col s12 m4'>
      <div className='icon-block'>
        <h2 className='center blue-grey-text darken-2'>
          <i className='material-icons medium'>{ props.icon }</i>
        </h2>
        <h5 className='center'>{ props.center_text }</h5>
        <p className='light'>
          { props.block_text }
        </p>
      </div>
    </div>
  )
}

export default IconBlock
