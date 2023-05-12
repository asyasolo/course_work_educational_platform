import React, { useEffect, useContext } from "react"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import { useNavigate } from "react-router-dom"
import { CSSTransition } from "react-transition-group"

import DispatchContext from "../../DispatchContext"

function Registration() {
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()

  const initialState = {
    username: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    email: {
      value: "",
      hasErrors: false,
      message: "",
      isUnique: false,
      checkCount: 0
    },
    password: {
      value: "",
      hasErrors: false,
      message: ""
    },
    submitCount: 0
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "usernameImmediately":
        draft.username.hasErrors = false
        draft.username.value = action.value
        if (draft.username.value.length > 30) {
          draft.username.hasErrors = true
          draft.username.message = "Username must not exceed 30 charecters."
        }
        if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
          draft.username.hasErrors = true
          draft.username.message = "Используйте только цифры и латинские буквы."
        }
        return
      case "usernameAfterDelay":
        if (draft.username.value.length < 3) {
          draft.username.hasErrors = true
          draft.username.message = "Логин должен быть не менее 3 символов."
        }
        if (!draft.username.hasErrors && !action.noRequest) {
          draft.username.checkCount++
        }
        return
      case "usernameUniqueResults":
        if (action.value) {
          draft.username.hasErrors = true
          draft.username.isUnique = false
          draft.username.message = "Это имя пользователя уже занято."
        } else {
          draft.username.isUnique = true
        }
        return
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.value = action.value
        return
      case "emailAfterDelay":
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true
          draft.email.message = "Укажите действующий адрес почты."
        }
        if (!draft.email.hasErrors && !action.noRequest) {
          draft.email.checkCount++
        }
        return
      case "emailUniqueResults":
        if (action.value) {
          draft.email.hasErrors = true
          draft.email.isUnique = false
          draft.email.message = "Эта почта уже используется."
        } else {
          draft.email.isUnique = true
        }
        return
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.value = action.value
        if (draft.password.value.length > 50) {
          draft.password.hasErrors = true
          draft.password.message = "Пароль не должен превышать 50 символов."
        }
        return
      case "passwordAfterDelay":
        if (draft.password.value.length < 12) {
          draft.password.hasErrors = true
          draft.password.message = "Пароль должен быть не менее 12 символов."
        }
        return
      case "submitForm":
        if (!draft.username.hasErrors && draft.username.isUnique && !draft.email.hasErrors && draft.email.isUnique && !draft.password.hasErrors) {
          draft.submitCount++
        }
        return
    }
  }
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // seting timeouts on change for username, email, and password
  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => dispatch({ type: "usernameAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.username.value])

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.email.value])

  useEffect(() => {
    if (state.password.value) {
      const delay = setTimeout(() => dispatch({ type: "passwordAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
  }, [state.password.value])

  // checkCount?
  useEffect(() => {
    if (state.username.checkCount) {
      const request = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesUsernameExist", { username: state.username.value }, { cancelToken: request.token })
          dispatch({ type: "usernameUniqueResults", value: response.data })
        } catch (error) {
          console.log(error.response)
        }
      }
      fetchResults()
      return () => request.cancel()
    }
  }, [state.username.checkCount])

  useEffect(() => {
    if (state.email.checkCount) {
      const request = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/doesEmailExist", { email: state.email.value }, { cancelToken: request.token })
          dispatch({ type: "emailUniqueResults", value: response.data })
        } catch (error) {
          console.log(error.response)
        }
      }
      fetchResults()
      return () => request.cancel()
    }
  }, [state.email.checkCount])

  // submitting form for creating account
  useEffect(() => {
    if (state.submitCount) {
      const request = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/register", { email: state.email.value, username: state.username.value, password: state.password.value }, { cancelToken: request.token })
          console.log("account created")
          appDispatch({ type: "login", data: response.data })
          appDispatch({ type: "flashMessage", value: "Your account was created!" })
        } catch (error) {
          console.log(error.response)
        }
      }
      fetchResults()
      return () => request.cancel()
    }
  }, [state.submitCount])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "usernameImmediately", value: state.username.value })
    dispatch({ type: "usernameAfterDelay", value: state.username.value, noRequest: true })
    dispatch({ type: "emailImmediately", value: state.email.value })
    dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true })
    dispatch({ type: "passwordImmediately", value: state.password.value })
    dispatch({ type: "passwordAfterDelay", value: state.password.value })
    dispatch({ type: "submitForm" })
  }

  return (
    <div className="register text-block">
      <div className="about-text-area">
        <h3>НАШИ КУРСЫ</h3>
        <p>научитесь создавать с нами</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h4>Регистрация</h4>
        <div className="login-form-block">
          <input type="text" name="login" id="username-register" className="login-form-item" placeholder="логин" onChange={e => dispatch({ type: "usernameImmediately", value: e.target.value })} autoComplete="off" />
          <CSSTransition in={state.username.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="small-alert">{state.username.message}</div>
          </CSSTransition>
        </div>

        <div className="login-form-block">
          <input type="text" name="password" id="password-register" className="login-form-item" placeholder="пароль" onChange={e => dispatch({ type: "passwordImmediately", value: e.target.value })} autoComplete="off" />
          <CSSTransition in={state.password.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="small-alert">{state.password.message}</div>
          </CSSTransition>
        </div>

        <div className="login-form-block">
          <input type="text" name="email" id="email-register" className="login-form-item" placeholder="почта" onChange={e => dispatch({ type: "emailImmediately", value: e.target.value })} autoComplete="off" />
          <CSSTransition in={state.email.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="small-alert">{state.email.message}</div>
          </CSSTransition>
        </div>

        <button className="register-btn " type="submit">
          ОК!
        </button>
      </form>
    </div>
  )
}

export default Registration
