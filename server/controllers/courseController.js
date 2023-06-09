const Course = require("../models/Course")

exports.findCourseByRouteString = async function (req, res) {
  try {
    let course = await Course.findSingleByRoute(req.params.routeString)
    res.json(course)
  } catch (e) {
    res.json(false)
  }
}

exports.getAllCourses = async function (req, res) {
  try {
    let courses = await Course.findAll()
    res.json(courses)
  } catch (error) {
    res.json(false)
  }
}
