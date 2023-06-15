const User = require("../models/User")
const Course = require("../models/Course")
const jwt = require("jsonwebtoken")

const tokenLasts = "14d"

exports.getFeed = async function (req, res) {
  try {
    let courses = await User.findByUserID(req.apiUser._id)
    res.json(courses)
  } catch (e) {
    res.status(500).send("Sorry, invalid user request.")
  }
}

exports.checkToken = function (req, res) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET)
    res.json(true)
  } catch (e) {
    res.json(false)
  }
}

exports.apiMustBeLoggedIn = function (req, res, next) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET)
    console.log(req.apiUser)
    next()
  } catch (e) {
    res.status(500).send("Sorry, you must provide a valid token.")
  }
}

exports.apiLogin = function (req, res) {
  let user = new User(req.body)
  user
    .login()
    .then(function (result) {
      res.json({
        token: jwt.sign({ _id: user.data._id, username: user.data.username }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        username: user.data.username
      })
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.apiRegister = function (req, res) {
  let user = new User(req.body)
  user
    .register()
    .then(() => {
      res.json({
        token: jwt.sign({ _id: user.data._id, username: user.data.username }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        username: user.data.username
      })
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}

exports.ifUserExists = function (req, res, next) {
  User.findByUsername(req.params.username)
    .then(function (userDocument) {
      req.profileUser = userDocument
      next()
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.doesUsernameExist = function (req, res) {
  User.findByUsername(req.body.username.toLowerCase())
    .then(function () {
      res.json(true)
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.doesEmailExist = async function (req, res) {
  let emailBool = await User.doesEmailExist(req.body.email)
  res.json(emailBool)
}
