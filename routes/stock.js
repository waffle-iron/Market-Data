const express = require('express')
const bhttp = require('bhttp')
const Promise = require('bluebird')
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
    console.log('Trying to watch:', req.params.symbol)
    if (req.session.userID) {
      Promise.try(() => {
        return knex('watchlists')
          .where({
            user_id: req.session.userID,
            date_deleted: null
          })
          .select('id')
      }).then(data => {
        const { id } = data[0]
        return knex('watchlist_stocks')
          .returning(['symbol'])
          .insert({
            symbol: req.params.symbol,
            user_id: req.session.userID,
            watchlist_id: id
          })
      }).then(data => {
        const { symbol } = data[0]
        console.log(data)
        res.send('You are now watching', symbol)
      })
    } else {
      res.status(401).send('Not Authorized')
    }
  })

  router.post('/buy', (req, res) => {
    if (req.session.userID) {
      const { name, shares, symbol, price } = req.body
      console.log('Buying Symbol...')
      console.log(req.body)
      Promise.try(() => {
        return knex('portfolios')
          .where({
            user_id: req.session.userID,
            date_deleted: null
          })
      }).then(data => {
        const { id, funds } = data[0]
        return knex('portfolio_stocks')
          .returning(['portfolio_id'])
          .insert({
            symbol,
            shares,
            price,
            user_id: req.session.userID,
            portfolio_id: id,
            company_name: name,
            action: 'BUY'
          })
      }).then(data => {
        const { portfolio_id } = data[0]
        return knex('portfolio_stocks')
          .where({
            portfolio_id,
            user_id: req.session.userID,
            date_deleted: null
          })
      }).then(data => {
        res.status(200).send(data)
      })
    } else {
      res.status(401).send('Not Authorized')
    }
  })

  router.post('/sell', (req, res) => {
    if (req.session.userID) {
      const { name, shares, symbol, price } = req.body
      console.log('Selling Symbol...')
      console.log(req.body)
      Promise.try(() => {
        return knex('portfolios')
          .where({
            user_id: req.session.userID,
            date_deleted: null
          })
      }).then(data => {
        const { id, funds } = data[0]
        return knex('portfolio_stocks')
          .returning(['portfolio_id'])
          .insert({
            symbol,
            shares,
            price,
            user_id: req.session.userID,
            portfolio_id: id,
            company_name: name,
            action: 'SELL'
          })
      }).then(data => {
        const { portfolio_id } = data[0]
        return knex('portfolio_stocks')
          .where({
            portfolio_id,
            user_id: req.session.userID,
            date_deleted: null
          })
      }).then(data => {
        res.status(200).send(data)
      })
    } else {
      res.status(401).send('Not Authorized')
    }
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
