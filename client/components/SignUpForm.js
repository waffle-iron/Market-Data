import React from 'react'

import InputField from '../atoms/InputField'

const SignUpForm = (props) => {
  return (
    <div className='row'>
      <form className='col s12' onSubmit={props.onSubmit}>
        <InputField label='Username' htmlFor='username'>
          <input className='validate' type='text'
            name='email' onChange={props.onChange} />
        </InputField>
        <InputField label='Email' htmlFor='email'>
          <input className='validate' type='email'
            name='email' onChange={props.onChange} />
        </InputField>
        <InputField label='Password' htmlFor='password'>
          <input className='validate' type='password'
            name='password' onChange={props.onChange} />
        </InputField>
        <button className='btn-large waves-effect waves-light blue-grey lighten-4'>
          <i className='material-icons'>send</i>
        </button>
      </form>
    </div>
  )
}

export default SignUpForm
