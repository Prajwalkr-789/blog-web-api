const express = require('express')
const blogroute = express.Router()
const controller = require('../controllers/controller')

blogroute.post('/create',controller.createblog)
blogroute.get('/fetch',controller.fetchdata)

module.exports = blogroute;