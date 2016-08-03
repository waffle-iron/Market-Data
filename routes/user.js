const express = require('express')
const router = express.Router()
const config = require('../config.json')
const pg = require('pg')
const knex = require('knex')(config.knex)

router.get('/:username', (req, res) => {
    knex('user_profiles').where({
        user_username: req.params.username
    })
    .then(data => res.send(data[0]))
    .catch(error => res.send(error))
})

router.post('/create', (req, res) => {
    const { username, password, email } = req.body

    knex('users').insert({
        username,
        password_hash: password, // To be hashed
        email
    })
    .then(data => res.send(data))
    .catch(error => res.send(error))
})

module.exports = router
