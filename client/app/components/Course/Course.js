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

  if (isLoading) return <p>Loading....</p>

  return (
    <div className="course-wrapper">
      <h1>{course.courseName}</h1>
      <h3>{course.description}</h3>

      <div>
        {course.lessons.map(lesson => (
          <div>
            <h2>{lesson.title}</h2>
            {lesson.blocks.map(block => (
              <div key={block.title}>
                <h2>{block.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: block.content }}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Course
