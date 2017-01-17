const express = require('express')
const router = express.Router()

module.exports = (knex) => {
  router.get('/:commodity', (req, res) => {
    const endPoint = 'To Be Decided'
    res.send('Gold')
  })

  return router
}
