const express = require('express')
const argon2 = require('argon2')
const router = express.Router()

module.exports = (knex) => {
  router.post('/register', (req, res) => {
    const { username, password, email } = req.body

    // 32 byte length salt
    argon2.generateSalt(32)
      .then(salt => {
        argon2.hash(password, salt)
          .then(hash => {
            knex('users')
              .returning(['id', 'email'])
              .insert({
                username,
                password_hash: hash,
                email
              })
              .then(data => {
                console.log(data)
                res.send(data)
              })
          })
      })
      .catch(error => res.send(error))
  })

  router.post('/login', (req, res) => {
    const { email, password } = req.body

    knex('users')
      .where({
        email,
        date_deleted: null
      })
      .then(data => {
        const { id, password_hash, username } = data[0]

        argon2.verify(password_hash, password)
          .then(match => {
            if (match) {
              // req.session.id = id
              req.session.userID = id
              console.log(id, username, 'has logged in')
              console.log(req.session)
              res.status(200).send({ id, username })
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
    console.log('Logging out...')
    res.status(200).send('Logging out...')
  })

  router.get('/dashboard', (req, res) => {
    console.log('Getting dashboard data...')
    if (req.sessionID && req.session.userID) {
      console.log('SUCCESS')
      res.status(200).send({ status: true, message: 'Welcome to your dashboard!' })
    } else {
      console.log('FAIL')
      res.status(401).send({ status: false, message: 'Not Authorized' })
    }
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
