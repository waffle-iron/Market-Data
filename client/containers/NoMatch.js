import React, { Component } from 'react'

class NoMatch extends Component {
  constructor(props) {
    super(props)
  }
  handleClick = () => {
    const diceResult = Math.random() * 6
    alert('You roled a ' + diceResult + '!')
  }
  render() {
    return (
      <div>
        You stumbled into nothingness
        <a onClick={this.handleClick}>Roll Dice</a>
      </div>
    )
  }
}

export default NoMatch
