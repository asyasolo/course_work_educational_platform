const coursesCollection = require("../db").db().collection("courses")

let Course = function (data) {
  this.data = data
  this.errors = []
}

Course.findSingleByRoute = function (routeString) {
  return new Promise(async function (resolve, reject) {
    if (typeof routeString !== "string") {
      reject()
      return
    }

    let course = await coursesCollection.findOne({ routeString: routeString })

    if (course) {
      resolve(course)
    } else {
      reject()
    }
  })
}

Course.findAll = function () {
  return new Promise(async function (resolve, reject) {
    let courses = await coursesCollection.find().toArray()

    if (courses) {
      resolve(courses)
    } else {
      reject()
    }
  })
}

module.exports = Course
