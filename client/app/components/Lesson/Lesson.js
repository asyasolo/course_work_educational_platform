import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Axios from "axios"

import NotFound from "../NotFound/NotFound"

import StateContext from "../../StateContext"

function Lesson() {
  const appState = useContext(StateContext)

  const { routeString, lessonID } = useParams()
  const [lesson, setLesson] = useState()
  const [course, setCourse] = useState()
  const [userCourses, setUserCourses] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isMarked, setIsMarked] = useState(false)
  const navigate = useNavigate()
  let nextLessonID = "completed"

  useEffect(() => {
    setUserCourses(appState.user.completedLessons)
  }, [appState.user.completedLessons])

  useEffect(() => {
    for (let key in userCourses) {
      if (userCourses[key].includes(lessonID)) {
        setIsMarked(true)
        break // Если найдено совпадение, выходим из цикла
      } else setIsMarked(false)
    }
  }, [userCourses, lessonID])

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

  function showCourse(e) {
    e.preventDefault()
    navigate(`/courses/${routeString}`)
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

  function markLesson() {
    const axiosRequest = Axios.CancelToken.source()
    async function postData() {
      try {
        const response = await Axios.post("/mark_lesson", { token: appState.user.token, lessonID: lesson._id, routeString: routeString }, { cancelToken: axiosRequest.token })
        console.log(response.data)

        setIsMarked(true)
      } catch (error) {
        // Добавьте обработку ошибок, если необходимо
        console.log(error)
      }
    }

    postData()
  }

  return (
    <div className="view-lesson-wrapper">
      <h2>{lesson.title}</h2>
      <div className="lesson-content black" dangerouslySetInnerHTML={{ __html: lesson.content }}></div>

      <div className="button-block">
        <button className="veiw-button btn" onClick={showCourse}>
          ПРОСМОТР КУРСА
        </button>

        <button onClick={markLesson} className={`complete-button btn ${isMarked ? "completed" : ""}`}>
          {isMarked ? "ПРОЙДЕНО" : "ОТМЕТИТЬ ПРОЙДЕННЫМ"}
        </button>

        <button onClick={handleNextLesson} className="next-lesson-button btn">
          СЛЕДУЮЩИЙ УРОК
        </button>
      </div>
    </div>
  )
}

export default Lesson
