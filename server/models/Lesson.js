const lessonsCollection = require("../db").db().collection("lessons")
const ObjectId = require("mongodb").ObjectId

let Lesson = function (data) {
  this.data = data
  this.errors = []
}

Lesson.findSingleByID = function (lessonID) {
  return new Promise(async function (resolve, reject) {
    if (typeof lessonID !== "string" || !ObjectId.isValid(lessonID)) {
      reject()
      return
    }

    let lesson = await lessonsCollection.findOne({ _id: new ObjectId(lessonID) })

    if (lesson) {
      resolve(lesson)
    } else {
      reject()
    }
  })
}

module.exports = Lesson
