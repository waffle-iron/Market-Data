const express = require('express')
const argon2 = require('argon2')
const Promise = require('bluebird')
const router = express.Router()

module.exports = (knex) => {
  router.post('/register', (req, res) => {
    const { username, password, email } = req.body

    Promise.try(() => {
      return argon2.generateSalt(32)
    }).then(salt => {
      return argon2.hash(password, salt)
    }).then(hash => {
      return knex('users')
        .returning(['id', 'email'])
        .insert({
          email,
          username,
          password_hash: hash
        })
    }).then(data => {
      const { id } = data[0]
      return knex('portfolios')
        .returning(['user_id'])
        .insert({
          user_id: id
        })
    }).then(data => {
      const { user_id } = data[0]
      return knex('watchlists')
        .returning(['user_id'])
        .insert({
          user_id
        })
    }).then(data => {
      const { user_id } = data[0]
      req.session.userID = user_id
      res.status(200).send('Account created successfully')
    })
  })

  router.post('/login', (req, res) => {
    const { email, password } = req.body

    Promise.try(() => {
      return knex('users')
        .where({
          email,
          date_deleted: null
        })
    }).then(data => {
      const { id, username, password_hash } = data[0]
      return Promise.all([
        { id, username },
        argon2.verify(password_hash, password)
      ])
    }).spread((user, match) => {
      if (match) {
        req.session.userID = user.id
        res.status(200).send(user)
      } else {
        req.session.error = 'Access denied'
        res.status(401).send('Incorrect email or password')
      }
    })
  })

  router.get('/dashboard', (req, res) => {
    if (req.session.userID) {
      Promise.try(() => {
        return knex('portfolios')
          .where({
            user_id: req.session.userID
          })
      }).then(data => {
        const { name, funds, private } = data[0]
        res.status(200).send({ name, funds, private })
      })
    } else {
      res.status(401).send({ status: false, message: 'Not Authorized' })
    }
  })

  router.post('/logout', (req, res) => {
    req.session.destroy()
    console.log('Logging out...')
    res.status(200).send('Logging out...')
  })

  router.get('/:username', (req, res) => {
    knex('user_profiles')
      .where({
        user_username: req.params.username,
        date_deleted: null
      })
      .then(data => res.send(data[0]))
      .catch(error => res.send(error))
  })

  return router
}
