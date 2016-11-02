import React from 'react'

const InputField = (props) => {
  return (
    <div className='row'>
      <div className='input-field'>
        { props.children }
        <label htmlFor={props.htmlFor} data-error='Not Valid' data-success='Perfect!'>
          { props.label }
        </label>
      </div>
    </div>
  )
}

export default InputField