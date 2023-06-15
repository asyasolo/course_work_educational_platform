const apiRouter = require("express").Router()
const cors = require("cors")

const userController = require("./controllers/userController")
const courseController = require("./controllers/courseController")
const lessonController = require("./controllers/lessonController")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => res.json("surprisingly, it works well"))

// check token to log out front-end if expired
apiRouter.post("/checkToken", userController.checkToken)

apiRouter.post("/register", userController.apiRegister)
apiRouter.post("/login", userController.apiLogin)
apiRouter.get("/courses", courseController.getAllCourses)
apiRouter.post("/getAllCourses", courseController.getAllCourses)
apiRouter.get("/courses/:routeString", courseController.findCourseByRouteString)
apiRouter.get("/courses/:routeString/:lessonID", lessonController.findLessonByID)
apiRouter.post("/getHomeFeed", userController.apiMustBeLoggedIn, userController.getFeed)

/*apiRouter.post("/courses/:routeString/completed")*/

apiRouter.post("/doesUsernameExist", userController.doesUsernameExist)
apiRouter.post("/doesEmailExist", userController.doesEmailExist)

module.exports = apiRouter
