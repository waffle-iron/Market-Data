import React from 'react'

import Input from '../atoms/Input'
import Btn from '../atoms/Btn'

const StockForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <Input type='text' onChange={props.onChange}
          value={props.value} />
        <Btn text='Search' />
      </form>
    </div>
  )
}

export default StockForm
