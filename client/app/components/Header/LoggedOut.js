import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function LoggedOut() {
  return (
    <ul className="nav">
      <li>КТО МЫ</li>
      <li>НАШИ КУРСЫ</li>
      <li>
        <Link className="anchor-li logo" to="/">
          <span>ida</span>
          <span>Foundation</span>
        </Link>
      </li>
      <li>
        <Link className="anchor-li" to="/login">
          ВОЙТИ
        </Link>
      </li>
      <li>
        <span className="pink-btn">
          <Link to="/register">РЕГИСТРАЦИЯ</Link>
        </span>
      </li>
    </ul>
  )
}

export default LoggedOut
