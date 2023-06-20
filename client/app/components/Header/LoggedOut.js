import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function LoggedOut() {
  const [menuActive, setMenuActive] = useState(false)

  function handleMenuToggle() {
    setMenuActive(!menuActive)
  }

  return (
    <>
      <ul className="nav">
        <div className="hidden"></div>
        <Link className="nav-item-anc" to="/">
          <li>КТО МЫ</li>
        </Link>
        <Link className="nav-item-anc" to="/courses">
          <li>НАШИ КУРСЫ</li>
        </Link>
        <li>
          <Link className="anchor-li logo" to="/">
            <span>ida</span>
            <span>Foundation</span>
          </Link>
        </li>
        <Link className="nav-item-anc anchor-li" to="/login">
          <li>ВОЙТИ</li>
        </Link>
        <li className="nav-item-anc">
          <span className="pink-btn">
            <Link to="/register">РЕГИСТРАЦИЯ</Link>
          </span>
        </li>
        <li>
          <button onClick={handleMenuToggle} id="menu-toggle">
            <img height={25} src="../../img/menu-burger.svg" alt="" />
          </button>
        </li>
      </ul>

      {menuActive && (
        <ul id="dropout_menu">
          <Link className="dropout_menu_item" to="/">
            <li>КТО МЫ</li>
          </Link>

          <Link className="dropout_menu_item" to="/courses">
            <li>НАШИ КУРСЫ</li>
          </Link>

          <Link className="dropout_menu_item" to="/login">
            <li>ВОЙТИ</li>
          </Link>
          <Link className="dropout_menu_item" to="/register">
            <li>РЕГИСТРАЦИЯ</li>
          </Link>
        </ul>
      )}
    </>
  )
}

export default LoggedOut
