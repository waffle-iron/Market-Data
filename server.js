const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')

const { secret } = require('./secret.json')

const staticPath = path.join(__dirname, 'static')

const currency = require('./routes/currency')
const stock = require('./routes/stock')
const user = require('./routes/user')

app.use(cors())
app.use(session({ secret, cookie: { maxAge: 60000 } }))

app.use(bodyParser.json())

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
