import React, { useContext } from "react"
import { Link } from "react-router-dom"

import DispatchContext from "../../DispatchContext"

function LoggedIn() {
  const appDispatch = useContext(DispatchContext)

  function handleLogout() {
    appDispatch({ type: "logout" })
    appDispatch({ type: "flashMessage", value: "You have logged out." })
  }

  return (
    <ul className="nav">
      <li>КТО МЫ</li>
      <li>НАШИ КУРСЫ</li>
      <li className="logo">
        <span>kitty</span>
        <span>Foundation</span>
      </li>
      <li>ПРОФИЛЬ</li>
      <li>
        <span className="pink-btn" onClick={handleLogout}>
          <Link to="/">ВЫЙТИ</Link>
        </span>
      </li>
    </ul>
  )
}

export default LoggedIn
