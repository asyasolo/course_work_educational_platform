import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function LoggedOut() {
  return (
    <ul className="nav">
      <Link to="/">
        <li>КТО МЫ</li>
      </Link>
      <Link to="/courses">
        <li>НАШИ КУРСЫ</li>
      </Link>
      <li>
        <Link className="anchor-li logo" to="/">
          <span>ida</span>
          <span>Foundation</span>
        </Link>
      </li>
      <Link className="anchor-li" to="/login">
        <li>ВОЙТИ</li>
      </Link>
      <li>
        <span className="pink-btn">
          <Link to="/register">РЕГИСТРАЦИЯ</Link>
        </span>
      </li>
    </ul>
  )
}

export default LoggedOut
