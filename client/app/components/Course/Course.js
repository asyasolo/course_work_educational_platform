import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom"

import NotFound from "../NotFound/NotFound"

function Course() {
  const [isLoading, setIsLoading] = useState(true)
  const [course, setCourse] = useState()
  const { routeString } = useParams()

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
          <img src="../../img/king.png" height={166} alt="" />
        </div>
      </div>

      <div className="course-blocks-wrapper">
        {course.lessons.map(lesson => (
          <div className="block-wrapper">
            <h4 className="pink">{lesson.title}</h4>
            {lesson.blocks.map(block => (
              <div className="lesson-wrapper" key={block.title}>
                <Link to={`/courses/${course.routeString}/${block.lessonID}`}>
                  <p className="white">{block.title}</p>
                </Link>
                <img src="../../img/star.svg" height={33} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Course
