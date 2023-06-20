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
    <>
      <ul className="nav">
        <li className="nav-item-anc">КТО МЫ</li>
        <Link to="/courses" className="nav-item-anc">
          <li>НАШИ КУРСЫ</li>
        </Link>

        <li className="logo">
          <span>ida</span>
          <span>Foundation</span>
        </li>
        <Link className="nav-item-anc" to="/">
          <li>ПРОФИЛЬ</li>
        </Link>
        <li className="nav-item-anc">
          <span className="pink-btn" onClick={handleLogout}>
            <Link to="/">ВЫЙТИ</Link>
          </span>
        </li>
        <li>
          <button onClick={handleMenuToggle} id="menu-toggle">
            <img src="../../img/menu-burger.svg" alt="" />
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

export default LoggedIn
