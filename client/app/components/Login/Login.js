import React, { useState, useContext } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

import DispatchContext from "../../DispatchContext"

function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.post("/login", { username, password })
      if (response.data) {
        appDispatch({ type: "login", data: response.data })
        appDispatch({ type: "flashMessage", value: "You're logged in." })
        navigate("/")
      } else {
        console.log("incorrect data")
        appDispatch({ type: "flashMessage", value: "Invalid password / username." })
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className="register text-block">
      <form onSubmit={handleSubmit} className="login-form">
        <h4>ВХОД</h4>

        <input type="text" name="login" id="username" className="login-form-item" placeholder="логин" autoComplete="off" onChange={e => setUsername(e.target.value)} />

        <input type="text" name="password" id="password" className="login-form-item" placeholder="пароль" autoComplete="off" onChange={e => setPassword(e.target.value)} />

        <button className="register-btn">Ок!</button>
      </form>
    </div>
  )
}

export default Login
