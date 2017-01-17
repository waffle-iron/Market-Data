const express = require('express')
const bhttp = require('bhttp')
const router = express.Router()

module.exports = (knex) => {
  router.get('/input/:symbol', (req, res) => {
    const baseURL = 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup'
  })

  router.get('/chart/:symbol', (req, res) => {
    const { symbol } = req.params
    const baseURL = 'http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/'
    const endPoint = `${baseURL}json?parameters={"Normalized":false,"NumberOfDays":365,"DataPeriod":"Day","Elements":[{"Symbol":"${symbol}","Type":"price","Params":["c"]}]}`

    bhttp.get(endPoint, {}, (error, response) => {
      if (error) console.log(error)
      res.send(response.body.toString())
    })
  })

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
    const { symbol } = req.params
    const baseURL = 'http://dev.markitondemand.com/MODApis/Api/v2/'
    const endPoint = `${baseURL}Quote/json?symbol=${symbol}`

    bhttp.get(endPoint, {}, (error, response) => {
      if (error) console.log(error)
      res.send(response.body.toString())
    })
  })

  return router
}
