import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'

import Btn from '../../client/atoms/Btn'

describe('<Btn />', () => {
  it('should render text properly', () => {
    const wrapper = mount(<Btn text='Random text' />)
    expect(wrapper.text()).to.equal('Random text')
  })
  it('should click', () => {
    const handleButtonClick = sinon.spy()
    const wrapper = mount(<Btn onClick={handleButtonClick} />)
    wrapper.find('button').simulate('click', { preventDefault: () => {} })
    expect(handleButtonClick.calledOnce).to.equal(true)
  })
})
