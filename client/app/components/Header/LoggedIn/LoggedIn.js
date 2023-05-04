import React, { useEffect } from "react"

function LoggedIn() {
  return (
    <ul className="nav">
      <li>КТО МЫ</li>
      <li>ВСЕ КУРСЫ</li>
      <li className="logo">
        <span>kitty</span>
        <span>Foundation</span>
      </li>
      <li>ПРОФИЛЬ</li>
      <li>
        <span className="pink-btn">
          <a href="#">ВЫЙТИ</a>
        </span>
      </li>
    </ul>
  )
}

export default LoggedIn
