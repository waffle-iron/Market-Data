const express = require('express')
// const redis = require('redis')
const app = express()
// const client = redis.createClient()
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { secret } = require('./secret.json')

const staticPath = path.join(__dirname, 'static')

const currency = require('./routes/currency')
const stock = require('./routes/stock')
const user = require('./routes/user')

app.use(cors())

app.use(bodyParser.json())

app.use(cookieParser())
app.use(session({
  secret,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true
}))

app.use(express.static(staticPath))

app.use('/v1/currency', currency)
app.use('/v1/stock', stock)
app.use('/v1/user', user)

app.get('*', (req, res) => {
  res.sendFile('index.html', {
    root: staticPath
  })
})

app.listen(8080, () => console.log('λ CORS-enabled server on port: 8080'))
