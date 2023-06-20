import React, { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"
Axios.defaults.baseURL = "https://idafoundation-api.onrender.com/"

import "./main.css"

import ScrollToTop from "./utils/ScrollToTop"

// global state and dispatch
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Guest from "./components/Guest/Guest"
import NotFound from "./components/NotFound/NotFound"
import Home from "./components/Home/Home"
import Registration from "./components/Registration/Registration"
import Login from "./components/Login/Login"
import Course from "./components/Course/Course"
import Lesson from "./components/Lesson/Lesson"
import Completed from "./components/Completed/Completed"
import CourseList from "./containers/CourseList/CourseList"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("appToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("appToken"),
      username: localStorage.getItem("appUsername"),
      activeCourses: [],
      completedLessons: {}
    }
  }
  function reducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = {
          token: action.data.token,
          username: action.data.username
        }
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      case "setActiveCourses":
        draft.user.activeCourses = action.courses
        return
      case "setCompletedLessons":
        draft.user.completedLessons = action.lessons
        return
      default:
        return draft
    }
  }
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("appToken", state.user.token)
      localStorage.setItem("appUsername", state.user.username)
    } else {
      localStorage.removeItem("appToken")
      localStorage.removeItem("appUsername")
    }
  }, [state.loggedIn])

  useEffect(() => {
    // if requestCount > 0
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source()
      async function fetchResults() {
        try {
          const response = await Axios.post("/checkToken", { token: state.user.token }, { cancelToken: ourRequest.token })
          if (!response.data) {
            dispatch({ type: "logout" })
            dispatch({ type: "flashMessage", value: "Your session has expired. Please log in again." })
          }
        } catch (error) {
          console.log(error.response.data)
        }
      }
      fetchResults()
      return () => ourRequest.cancel()
    }
  }, [])

  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source()

      async function fetchUserDetails() {
        try {
          const response = await Axios.post("/userDetails", { token: state.user.token }, { cancelToken: ourRequest.token })
          dispatch({ type: "setActiveCourses", courses: response.data.activeCourses })
          dispatch({ type: "setCompletedLessons", lessons: response.data.completedLessons })
        } catch (error) {
          console.log(error.response.data)
        }
      }

      fetchUserDetails()
      return () => ourRequest.cancel()
    }
  }, [state.loggedIn])

  return (
    <div>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <ScrollToTop />
            <Header />

            <Routes>
              <Route path="/" element={state.loggedIn ? <Home /> : <Guest />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/:routeString" element={<Course />} />
              <Route path="/courses/:routeString/:lessonID" element={<Lesson />} />
              <Route path="/courses/:routeString/completed" element={<Completed />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  )
}

const root = createRoot(document.getElementById("app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
