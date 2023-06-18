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
      <Link to="/courses">
        <li>НАШИ КУРСЫ</li>
      </Link>

      <li className="logo">
        <span>ida</span>
        <span>Foundation</span>
      </li>
      <Link to="/">
        <li>ПРОФИЛЬ</li>
      </Link>
      <li>
        <span className="pink-btn" onClick={handleLogout}>
          <Link to="/">ВЫЙТИ</Link>
        </span>
      </li>
    </ul>
  )
}

export default LoggedIn
