const bcrypt = require("bcryptjs")
const usersCollection = require("../db").db().collection("users")
const validator = require("validator")
const ObjectId = require("mongodb").ObjectId

let User = function (data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = ""
  }
  if (typeof this.data.email != "string") {
    this.data.email = ""
  }
  if (typeof this.data.password != "string") {
    this.data.password = ""
  }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  }
}

User.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {
      this.errors.push("You must provide a username.")
    }
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
      this.errors.push("Username can only contain letters and numbers.")
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("You must provide a valid email address.")
    }
    if (this.data.password == "") {
      this.errors.push("You must provide a password.")
    }
    if (this.data.password.length > 0 && this.data.password.length < 12) {
      this.errors.push("Password must be at least 12 characters.")
    }
    if (this.data.password.length > 30) {
      this.errors.push("Password cannot exceed 30 characters.")
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("Username must be at least 3 characters.")
    }
    if (this.data.username.length > 30) {
      this.errors.push("Username cannot exceed 30 characters.")
    }

    // Only if username is valid then check to see if it's already taken
    if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
      let usernameExists = await usersCollection.findOne({ username: this.data.username })
      if (usernameExists) {
        this.errors.push("That username is already taken.")
      }
    }

    // Only if email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({ email: this.data.email })
      if (emailExists) {
        this.errors.push("That email is already being used.")
      }
    }
    resolve()
  })
}

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    usersCollection
      .findOne({ username: this.data.username })
      .then(attemptedUser => {
        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
          this.data = attemptedUser
          resolve("Congrats!")
        } else {
          reject("Invalid username / password.")
        }
      })
      .catch(function (e) {
        reject("Please try again later.")
      })
  })
}

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    // Step #1: Validate user data
    this.cleanUp()
    await this.validate()

    // Step #2: Only if there are no validation errors
    // then save the user data into a database
    if (!this.errors.length) {
      // hash user password
      let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      await usersCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

User.findByUsername = function (username) {
  return new Promise(function (resolve, reject) {
    if (typeof username != "string") {
      reject()
      return
    }
    usersCollection
      .findOne({ username: username })
      .then(function (userDoc) {
        if (userDoc) {
          // userDoc = new User(userDoc, true)
          userDoc = new User(userDoc)
          userDoc = {
            _id: userDoc.data._id,
            username: userDoc.data.username
          }
          resolve(userDoc)
        } else {
          reject()
        }
      })
      .catch(function (e) {
        reject()
      })
  })
}

User.doesEmailExist = function (email) {
  return new Promise(async function (resolve, reject) {
    if (typeof email != "string") {
      resolve(false)
      return
    }

    let user = await usersCollection.findOne({ email: email })
    if (user) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

User.findByUserID = function (authorId) {
  return new Promise(async function (resolve, reject) {
    if (typeof authorId != "string" || !ObjectId.isValid(authorId)) {
      reject()
      return
    }

    let user = await usersCollection.findOne({ _id: new ObjectId(authorId) })
    let courses = user.activeCourses

    if (courses) {
      console.log(courses)
      resolve(courses)
    } else {
      reject()
    }
  })
}

module.exports = User
