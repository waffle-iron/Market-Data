const express = require('express')
const bhttp = require('bhttp')
const router = express.Router()

module.exports = (knex) => {
  router.post('/watch/:symbol', (req, res) => {
    res.send('You are now watching:', req.params.symbol)
  })

  router.post('/buy/:symbol', (req, res) => {
    res.send('You just bought:', req.params.symbol)
  })

  router.post('/sell/:symbol', (req, res) => {
    res.send('You just sold:', req.params.symbol)
  })

  router.get('/:symbol', (req, res) => {
    const endPoint = `http://api.fixer.io/latest?base=${req.params.symbol}`

    bhttp.get(endPoint, {}, (error, response) => {
      if (error) console.log(error)
      res.send(response.body.toString())
    })
  })

  return router
}
