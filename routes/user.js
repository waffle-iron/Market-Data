const express = require('express')
const argon2 = require('argon2')
const router = express.Router()
const config = require('../config.json')
const pg = require('pg')
const knex = require('knex')(config.knex)

router.get('/:username', (req, res) => {
  knex('user_profiles')
    .where({
        user_username: req.params.username
    })
    .then(data => res.send(data[0]))
    .catch(error => res.send(error))
})

router.post('/create', (req, res) => {
  const { username, password, email } = req.body

  // 32 byte length salt
  argon2.generateSalt(32)
    .then(salt => {
      argon2.hash(password, salt)
        .then(hash => {
          knex('users')
            .insert({
              username,
              password_hash: hash,
              email
            })
            .then(data => res.send(data))
        })
    })
    .catch(error => res.send(error))
})

router.post('/login', (req, res) => {
  // To be finished
  const { email, username, password } = req.body
  // const loginCred = email === null ? username : email

  knex('users')
    .where({ email })
    .select('password_hash')
    .then(data => {
      const { password_hash } = data[0]

      argon2.verify(password_hash, password)
        .then(match => {
          if (match) {
            // To be added
          }
        })
        .catch(error => res.send(error))
    })
    .catch(error => res.send(error))
})

module.exports = router
