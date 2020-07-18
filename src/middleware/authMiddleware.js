import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import User from '../model/user'

const TOKENTIME = 60 * 60 * 24 * 30 * 12 //set token time for 1 year
let SECRET = '@_@ L00k Li|<e F@T@SS'

let authenticate = expressJwt({
  secret: SECRET
})

let generateAccessToken = (req, res, next) => {
  req.token = req.token || {}
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET, {
    expiresIn: TOKENTIME
  })
  next()
}

let respond = (req, res) => {
  User.find({
    email:  req.user.username
  }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json({
      user: req.user.username,
      token: req.token,
      userData: user
    })
  })
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}
