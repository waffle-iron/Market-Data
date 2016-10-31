import React from 'react'

import Input from '../atoms/Input'
import Btn from '../atoms/Btn'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <Input type='text' placeholder='Email'
        name='email' onChange={props.onChange} />
      <Input type='password' placeholder='Password'
        name='password' onChange={props.onChange} />
      <Btn text='Log In' />
    </form>
  )
}

export default LoginForm
