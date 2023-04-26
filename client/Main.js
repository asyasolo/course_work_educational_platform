import React from "react"
import { createRoot } from "react-dom/client"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"

import App from "./app/App"

function Main() {
  return <App />
}

const root = createRoot(document.getElementById("app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
