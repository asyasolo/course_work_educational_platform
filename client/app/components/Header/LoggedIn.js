import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"

import DispatchContext from "../../DispatchContext"

function LoggedIn() {
  const appDispatch = useContext(DispatchContext)
  const [menuActive, setMenuActive] = useState(false)

  function handleMenuToggle() {
    setMenuActive(!menuActive)
  }

  function handleLogout() {
    appDispatch({ type: "logout" })
    appDispatch({ type: "flashMessage", value: "You have logged out." })
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
          <Link to="/courses" className="nav-item-anc">
            НАШИ КУРСЫ
          </Link>
        </li>
      </ul>

      <li className="logo">
        <span>ida</span>
        <span>Foundation</span>
      </li>
      <ul className="nav nav-right">
        <li>
          <Link className="nav-item-anc" to="/">
            ПРОФИЛЬ
          </Link>
        </li>

        <li onClick={handleLogout}>
          <Link className="pink-btn anchor-li nav-item-anc" to="/">
            ВЫЙТИ
          </Link>
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
    </header>
  )
}

export default LoggedIn
