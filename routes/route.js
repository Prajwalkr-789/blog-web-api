const express = require('express')
const routes = express.Router()
const controller = require('../controllers/controller')

routes.post('/signup',controller.sign_up)
routes.post('/logout',controller.logout)
routes.post('/login',controller.login)
routes.post('/create',controller.login)
routes.get('/logout',controller.logout)
routes.get('/auth',controller.authentication)

module.exports = routes;
