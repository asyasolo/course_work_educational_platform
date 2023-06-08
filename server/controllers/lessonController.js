const Lesson = require("../models/Lesson")

exports.findLessonByID = async function (req, res) {
  try {
    console.log(req.params.lessonID)
    let lesson = await Lesson.findSingleByID(req.params.lessonID)
    res.json(lesson)
  } catch (e) {
    res.json(false)
  }
}
