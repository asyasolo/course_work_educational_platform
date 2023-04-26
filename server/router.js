const apiRouter = require("express").Router()
const cors = require("cors")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => res.json("surprisingly, it works"))

module.exports = apiRouter
