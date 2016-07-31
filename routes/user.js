const express = require('express')
const router = express.Router()
const config = require('../config.json')
const pg = require('pg')
const knex = require('knex')(config.knex)

router.get('/:username', (req, res) => {
    knex('user_profiles').where({
        username: req.params.username
    })
    .then(data => res.send(data))
    .catch(error => res.send(error))
})

router.post('/create', (req, res) => {
    res.send('Creating user with details:', req.body)
})

module.exports = router
