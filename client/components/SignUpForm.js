import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import InputField from '../atoms/InputField'

import Style from '../styles/components/SignUpForm'

const SignUpForm = (props) => {
  return (
    <div className='row'>
      <form className='col s12' onSubmit={props.onSubmit}>
        <InputField label='Username' htmlFor='username'>
          <input className='validate' type='text'
            name='username' onChange={props.onChange} />
        </InputField>
        <InputField label='Email' htmlFor='email'>
          <input className='validate' type='email'
            name='email' onChange={props.onChange} />
        </InputField>
        <InputField label='Password' htmlFor='password'>
          <input className='validate' type='password'
            name='password' onChange={props.onChange} />
        </InputField>
        <div className='center'>
          <button className='btn-large waves-effect waves-light blue-grey lighten-4' styleName='btn'>
            <i className='material-icons blue-grey-text text-darken-2'>send</i>
          </button>
          <div styleName='login'>
            Already have an account?
            <a href='#' onClick={props.onClick} value='login'> Log In</a>
          </div>
        </div>
      </form>
    </div>
  )
}

SignUpForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
}

export default CSSModules(SignUpForm, Style)
