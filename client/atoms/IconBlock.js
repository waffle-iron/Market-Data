import React from 'react'

const IconBlock = (props) => {
  return (
    <div className='col s12 m4'>
      <div className='icon-block'>
        <h2 className='center blue-grey-text darken-2'>
          <i className='material-icons'>{props.icon}</i>
        </h2>
        <h5 className='center'>Cool stuff here</h5>
        <p className='light'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}

export default IconBlock
