import React from 'react'
import CSSModules from 'react-css-modules'

import Input from '../atoms/Input'
import Btn from '../atoms/Btn'

import Style from '../styles/components/SignUpForm'

const SignUpForm = (props) => {
  return (
    <form styleName='root' onSubmit={props.onSubmit}>
      <Input type='text' placeholder='Username' name='username'
        value={props.username} onChange={props.onChange} />
      <Input type='email' placeholder='Email' name='email'
        value={props.email} onChange={props.onChange} />
      <Input type='password' placeholder='Password' name='password'
        value={props.password} onChange={props.onChange} />
      <Btn text='Sign Up' />
    </form>
  )
}

export default CSSModules(SignUpForm, Style)
