import React, { useEffect, useState, useContext } from "react"
import { useImmer } from "use-immer"
import Axios from "axios"
import { Link } from "react-router-dom"

import StateContext from "../../StateContext"

function Home() {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    isLoading: true,
    feed: [],
    coursesData: [],
    coursesRoutes: []
  })
  /*
  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source()

    async function fetchFeed() {
      try {
        const response = await Axios.post("/getHomeFeed", { token: appState.user.token }, { cancelToken: axiosRequest.token })
        console.log(response)
        setState(draft => {
          ;(draft.isLoading = false), (draft.coursesRoutes = response.data)
        })
      } catch (e) {
        console.log(e.response.data)
        setState(draft => {
          draft.isLoading = false
        })
      }
    }

    fetchFeed()
    return () => {
      axiosRequest.cancel()
    }
  }, [])*/

  useEffect(() => {
    setState(draft => {
      draft.coursesRoutes = appState.user.activeCourses
    })
  }, [appState.user.activeCourses])

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source()

    async function fetchAllCourses() {
      try {
        const response = await Axios.post("/getAllCourses")
        console.log(response)
        setState(draft => {
          ;(draft.coursesData = response.data), (draft.isLoading = false)
        })
      } catch (e) {
        console.log(e.response.data)
        setState(draft => {
          draft.isLoading = false
        })
      }
    }

    fetchAllCourses()
    return () => {
      axiosRequest.cancel()
    }
  }, [])

  useEffect(() => {
    if (state.coursesRoutes && state.coursesData) {
      const feed = state.coursesData.filter(course => state.coursesRoutes.includes(course.routeString))
      setState(draft => {
        draft.feed = feed
      })
    }
  }, [state.coursesRoutes, state.coursesData])

  if (state.isLoading) return <h2 className="white">Loading....</h2>

  return (
    <div className="course-wrapper">
      <div className="course-desc">
        <div className="course-text">
          <h2>ВАШИ КУРСЫ</h2>
          {state.feed.length === 0 ? (
            <p className="white">
              У вас пока нет курсов, хотите найти{" "}
              <Link to="/courses">
                <span className="pink">что-нибудь интересное?</span>
              </Link>{" "}
            </p>
          ) : (
            <p className="white">{appState.user.username}, хотите продолжить?</p>
          )}
        </div>
        <div className="course-img">
          <img src="../../img/masks_double.png" height={166} alt="" />
        </div>
      </div>

      {state.feed.length > 0 &&
        state.feed.map(course => (
          <div className="single_course" key={course._id}>
            <Link to={`/courses/${course.routeString}`}>
              <h4>{course.courseName}</h4>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Home
