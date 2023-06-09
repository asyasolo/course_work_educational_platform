import React, { useEffect, useState, useContext } from "react"
import Axios from "axios"
import { useParams, Link, useNavigate } from "react-router-dom"

import NotFound from "../../components/NotFound/NotFound"

function CourseList() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState()
  const { routeString } = useParams()

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source()

    async function fetchCourses() {
      try {
        const response = await Axios.get(`/courses`, { cancelToken: axiosRequest.token })
        setData(response.data)

        console.log(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("Problem")
      }
    }
    fetchCourses()
    return () => {
      axiosRequest.cancel()
    }
  }, [routeString])

  if (!isLoading && !data) {
    return <NotFound />
  }

  if (isLoading) return <h2 className="white">Loading....</h2>

  return (
    <div className="course-wrapper">
      <div className="course-desc">
        <div className="course-text">
          <h2>ВСЕ КУРСЫ</h2>
          <p className="white">добро пожаловать, здесь можно найти много интересного</p>
        </div>
        <div className="course-img">
          <img src="../../img/king.png" height={166} alt="" />
        </div>
      </div>

      {data.map(course => (
        <div className="single_course">
          <Link to={`/courses/${course.routeString}`}>
            <h4>{course.courseName}</h4>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CourseList
