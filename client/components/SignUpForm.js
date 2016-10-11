import React from 'react'

import Input from '../atoms/Input'
import Btn from '../atoms/Btn'

const SignUpForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <Input type='text' placeholder='Username'
        name='username' onChange={props.onChange} />
      <Input type='email' placeholder='Email'
        name='email' onChange={props.onChange} />
      <Input type='password' placeholder='Password'
        name='password' onChange={props.onChange} />
      <Btn text='Sign Up' />
    </form>
  )
}

export default SignUpForm
