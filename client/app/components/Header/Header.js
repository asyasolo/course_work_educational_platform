import React, { useContext } from "react"
import { Link } from "react-router-dom"

import LoggedIn from "./LoggedIn"
import LoggedOut from "./LoggedOut"
import StateContext from "../../StateContext"

function Header() {
  const appState = useContext(StateContext)

  return <>{appState.loggedIn ? <LoggedIn /> : <LoggedOut />}</>
}

export default Header
