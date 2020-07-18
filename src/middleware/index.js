import {
  Router
} from 'express'
var helmet = require('helmet')
var express = require('express')
var app = express()
var hidePoweredBy = require('hide-powered-by')

export default ({
  config,
  db
}) => {
  let api = Router()
  app.disable('x-powered-by');

  app.use(hidePoweredBy())
  app.use(helmet.hidePoweredBy({
    setTo: 'PHP 4.2.0'
  }))
  // api.use(helmet())
  app.use(helmet.frameguard())

  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'technoop.ir']
    }
  }))

  return api
}
