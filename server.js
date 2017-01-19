const config = require('./config.json')
const express = require('express')
const pg = require('pg')
const knex = require('knex')(config.knex)
const path = require('path')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
// const redis = require('redis')

const app = express()
// const client = redis.createClient()

const { secret } = require('./secret.json')

const staticPath = path.join(__dirname, 'static')

const currency = require('./routes/currency')(knex)
const stock = require('./routes/stock')(knex)
const user = require('./routes/user')(knex)

const whiteList = ['http://localhost:3000']

const corsOptionsDelegate = (req, callback) => {
  let corsOptions
  if (whiteList.indexOf(req.header('Origin')) !== -1){
    corsOptions = { origin: true } // Enable requested origin in CORS response
  } else {
    corsOptions = { origin: false } // Disable CORS for this request
  }
  callback(null, corsOptions);
}

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
}

// app.use(cors(corsOptionsDelegate))
app.use(allowCrossDomain)
app.use(helmet())
app.use(bodyParser.json())
app.use(cookieParser())

app.use(session({
  secret,
  name: 'sessionCookieID',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 3600000), // 1 Hour
    maxAge: 3600000,
  }
}))

app.use(express.static(staticPath))

// Loading of routes
app.use('/v1/currency', currency)
app.use('/v1/stock', stock)
app.use('/v1/user', user)

// Server-side rendering for React
app.get('*', (req, res) => {
  res.sendFile('index.html', {
    root: staticPath
  })
})

app.listen(8080, () => console.log('λ CORS-enabled server on port: 8080'))
