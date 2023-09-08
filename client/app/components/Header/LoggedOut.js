import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function LoggedOut() {
  const [menuActive, setMenuActive] = useState(false)

  function handleMenuToggle() {
    setMenuActive(!menuActive)
  }

  return (
    <header>
      <ul className="nav nav-left">
        <li>
          <Link className="nav-item-anc" to="/">
            КТО МЫ
          </Link>
        </li>

        <li>
          <Link className="nav-item-anc" to="/courses">
            НАШИ КУРСЫ
          </Link>
        </li>
      </ul>
      <Link className="anchor-li logo" to="/">
        <span>ida</span>
        <span>Foundation</span>
      </Link>
      <ul className="nav nav-right">
        <li>
          <Link className="nav-item-anc anchor-li" to="/login">
            ВОЙТИ
          </Link>
        </li>

        <li>
          <Link className="pink-btn anchor-li nav-item-anc" to="/register">
            РЕГИСТРАЦИЯ
          </Link>
        </li>
        <li className="nav-item-anc anchor-li">
          <button onClick={handleMenuToggle} id="menu-toggle">
            <img height={25} src="../../img/menu-burger.svg" alt="" />
          </button>
        </li>
      </ul>

      {menuActive && (
        <ul id="dropout_menu">
          <li>
            <Link className="dropout_menu_item" to="/">
              КТО МЫ
            </Link>
          </li>

          <li>
            <Link className="dropout_menu_item" to="/courses">
              НАШИ КУРСЫ
            </Link>
          </li>

          <li>
            <Link className="dropout_menu_item" to="/login">
              ВОЙТИ
            </Link>
          </li>

          <li>
            <Link className="dropout_menu_item" to="/register">
              РЕГИСТРАЦИЯ
            </Link>
          </li>
        </ul>
      )}
    </header>
  )
}

export default LoggedOut
