const express = require('express')
const bhttp = require('bhttp')
const router = express.Router()

router.get('/:commodity', (req, res) => {
    const endPoint = 'To Be Decided'
    res.send('Gold')
})

module.exports = router
