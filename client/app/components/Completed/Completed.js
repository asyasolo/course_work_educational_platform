import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import StateContext from "../../StateContext"

function Completed() {
  const AppState = useContext(StateContext)

  return (
    <div className="congrats_page_wrapper">
      <div className="congrats_page">
        <h2>Поздравляем, {AppState.user.username}!</h2>
        <h4>Вам удалось закончить курс</h4>
        <h4>
          Хотите выбрать{" "}
          <Link to="/courses">
            <span className="pink">что-нибудь еще</span>
          </Link>{" "}
          ?
        </h4>
      </div>
    </div>
  )
}

export default Completed
