import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"

import NotFound from "../NotFound/NotFound"

function Lesson() {
  const { routeString, lessonID } = useParams()
  const [lesson, setLesson] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source()

    async function fetchLesson() {
      console.log(lessonID)
      try {
        const response = await Axios.get(`/courses/${routeString}/${lessonID}`, { cancelToken: axiosRequest.token })
        setLesson(response.data)
        console.log(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("Problem")
      }
    }
    fetchLesson()
    return () => {
      axiosRequest.cancel()
    }
  }, [lessonID])

  if (!isLoading && !lesson) {
    return <NotFound />
  }

  if (isLoading) return <h2 className="white">Loading....</h2>

  return (
    <div className="view-lesson-wrapper">
      <h2>{lesson.title}</h2>
      <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }}></div>

      <div className="button-block">
        <button className="veiw-button">ПРОСМОТР КУРСА</button>
        <button className="complete-button">ОТМЕТИТЬ ПРОЙДЕННЫМ</button>
        <button className="next-lesson-button">СЛЕДУЮЩИЙ УРОК</button>
      </div>
    </div>
  )
}

export default Lesson
