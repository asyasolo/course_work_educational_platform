import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom"

import NotFound from "../NotFound/NotFound"

import StateContext from "../../StateContext"

function Course() {
  const AppState = useContext(StateContext)
  const [isLoading, setIsLoading] = useState(true)
  const [course, setCourse] = useState()
  const [userCourses, setUserCourses] = useState()
  const [completedLessons, setCompletedLessons] = useState()
  const { routeString } = useParams()

  useEffect(() => {
    setUserCourses(AppState.user.completedLessons)
  }, [AppState.user.completedLessons])

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source()

    async function fetchCourse() {
      try {
        const response = await Axios.get(`/courses/${routeString}`, { cancelToken: axiosRequest.token })
        setCourse(response.data)

        console.log(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("Problem")
      }
    }
    fetchCourse()
    return () => {
      axiosRequest.cancel()
    }
  }, [routeString])

  useEffect(() => {
    if (userCourses) {
      Object.keys(userCourses).forEach(key => {
        if (key === routeString) {
          setCompletedLessons(userCourses[key])
          return
        }
      })
    }
  }, [userCourses, routeString])

  useEffect(() => {
    console.log(completedLessons)
  }, [completedLessons])

  if (!isLoading && !course) {
    return <NotFound />
  }

  if (isLoading) return <h2 className="white">Loading....</h2>

  return (
    <div className="course-wrapper">
      <div className="course-desc">
        <div className="course-text">
          <h2>{course.courseName}</h2>
          <p className="white">{course.description}</p>
        </div>
        <div className="course-img">
          <img src="../../img/arleckin.png" height={250} alt="" />
        </div>
      </div>

      <div className="course-blocks-wrapper">
        {course.lessons.map(lesson => (
          <div className="block-wrapper" key={lesson.lessonID}>
            <h4 className="pink">{lesson.title}</h4>
            {lesson.blocks.map(block => (
              <div className="lesson-wrapper" key={block.lessonID}>
                <Link to={`/courses/${course.routeString}/${block.lessonID}`}>
                  <p className="white">{block.title}</p>
                </Link>
                {completedLessons && completedLessons.length > 0 && <img className="star_img" src={completedLessons.includes(block.lessonID) ? "../../img/star_golden.png" : "../../img/star.png"} height={33} alt="" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Course
