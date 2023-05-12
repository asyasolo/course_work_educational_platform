const apiRouter = require("express").Router()
const cors = require("cors")

const userController = require("./controllers/userController")
const courseController = require("./controllers/courseController")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => res.json("surprisingly, it works well"))

// check token to log out front-end if expired
apiRouter.post("/checkToken", userController.checkToken)

apiRouter.post("/register", userController.apiRegister)
apiRouter.post("/login", userController.apiLogin)

apiRouter.post("/doesUsernameExist", userController.doesUsernameExist)
apiRouter.post("/doesEmailExist", userController.doesEmailExist)

module.exports = apiRouter
