import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Axios from "axios"

import NotFound from "../NotFound/NotFound"

function Lesson() {
  const { routeString, lessonID } = useParams()
  const [lesson, setLesson] = useState()
  const [course, setCourse] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  let nextLessonID = "test"

  useEffect(() => {
    if (course) {
      nextLessonID = getNextLessonID()
      console.log(nextLessonID)
    }
  }, [course, lesson])

  useEffect(() => {
    const axiosRequest = Axios.CancelToken.source()

    async function fetchLesson() {
      try {
        const response = await Axios.get(`/courses/${routeString}/${lessonID}`, { cancelToken: axiosRequest.token })
        setLesson(response.data)
        console.log(response.data)

        if (!course) {
          const courseData = await Axios.get(`/courses/${routeString}`, { cancelToken: axiosRequest.token })
          setCourse(courseData.data)
          console.log(courseData.data)
        }

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

  function handleNextLesson(e) {
    e.preventDefault()

    if (nextLessonID) {
      navigate(`/courses/${routeString}/${nextLessonID}`, { replace: true })
    } else {
      navigate(`/courses/${routeString}/completed`)
    }
  }

  function getNextLessonID() {
    for (const item of course.lessons) {
      for (const block of item.blocks) {
        if (block.lessonID === lessonID) {
          const index = item.blocks.indexOf(block)
          if (index < item.blocks.length - 1) {
            return item.blocks[index + 1].lessonID
          } else {
            const nextLessonIndex = course.lessons.indexOf(item) + 1
            if (nextLessonIndex < course.lessons.length) {
              return course.lessons[nextLessonIndex].blocks[0].lessonID
            }
          }
        }
      }
    }
    return null // Возвращаем null, если следующего урока нет
  }
  return (
    <div className="view-lesson-wrapper">
      <h2>{lesson.title}</h2>
      <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }}></div>

      <div className="button-block">
        <button className="veiw-button">ПРОСМОТР КУРСА</button>
        <button className="complete-button">ОТМЕТИТЬ ПРОЙДЕННЫМ</button>
        <button onClick={handleNextLesson} className="next-lesson-button">
          {nextLessonID ? "СЛЕДУЮЩИЙ УРОК" : "ПОЗДРАВЛЯЕМ!"}
        </button>
      </div>
    </div>
  )
}

export default Lesson
