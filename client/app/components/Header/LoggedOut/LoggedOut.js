import React, { useEffect } from "react"

function LoggedOut() {
  return (
    <ul className="nav">
      <li>КТО МЫ</li>
      <li>ВСЕ КУРСЫ</li>
      <li className="logo">
        <span>kitty</span>
        <span>Foundation</span>
      </li>
      <li>ВОЙТИ</li>
      <li>
        <span className="pink-btn">
          <a href="#">РЕГИСТРАЦИЯ</a>
        </span>
      </li>
    </ul>
  )
}

export default LoggedOut
