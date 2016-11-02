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

router.post('/register', (req, res) => {
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
            .then(data => res.status(200).send('Account created successfully.'))
        })
    })
    .catch(error => res.send(error))
})

router.post('/login', (req, res) => {
  const { email, username, password } = req.body

  knex('users')
    .where({ email })
    .select('password_hash')
    .then(data => {
      const { password_hash } = data[0]

      argon2.verify(password_hash, password)
        .then(match => {
          if (match) {
            req.session.username = username
            res.status(200).send()
            console.log('User logged in')
          } else {
            req.session.error = 'Access denied'
            res.status(401).send('Incorrect password or email')
            res.redirect('/')
          }
        })
    })
    .catch(error => res.send(error))
})

router.get('/dashboard', (req, res) => {
  console.log(req.session)
  if (!req.session.username) {
    res.status(401).send()
  }
  res.status(200).send('Welcome to your dashboard')
})

module.exports = router
