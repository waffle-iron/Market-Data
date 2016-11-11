const express = require('express')
const argon2 = require('argon2')
const router = express.Router()
const config = require('../config.json')
const pg = require('pg')
const knex = require('knex')(config.knex)

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
            .then(data => {
              res.status(200).send('Registration Success!')
              console.log('New user registered')
            })
        })
    })
    .catch(error => res.send(error))
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  knex('users')
    .where({ email })
    .then(data => {
      const { id, password_hash, username } = data[0]

      argon2.verify(password_hash, password)
        .then(match => {
          if (match) {
            req.session[id] = { id, email, username }
            res.status(200).send({ id, username })
            console.log(id, username, 'logged in')
            console.log(req.session)
          } else {
            req.session.error = 'Access denied'
            res.status(401).send('Incorrect email or password')
          }
        })
    })
    .catch(error => res.status(401).send('Incorrect email or password'))
})

router.post('/logout', (req, res) => {
  req.session.destroy()
  res.send('Logging out...')
})

router.get('/dashboard', (req, res) => {
  console.log(req.session)
  if (!req.session.id) {
    res.status(401).send()
  }
  res.status(200).send('Welcome to your dashboard')
})

router.get('/:username', (req, res) => {
  knex('user_profiles')
    .where({
        user_username: req.params.username
    })
    .then(data => res.send(data[0]))
    .catch(error => res.send(error))
})

module.exports = router
