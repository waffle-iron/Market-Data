import React from 'react'
import CSSModules from 'react-css-modules'

import InputField from '../atoms/InputField'

import Style from '../styles/components/LoginForm'

const LoginForm = (props) => {
  return (
    <div className='row'>
      <form className='col s12' onSubmit={props.onSubmit}>
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
        </div>
      </form>
    </div>
  )
}

export default CSSModules(LoginForm, Style)
