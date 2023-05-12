import React, { useEffect } from "react"

import Registration from "../Registration/Registration"

function Guest() {
  return (
    <>
      <div className="hero text-block">
        <h1 className="hero-title1">УЧИСЬ</h1>
        <img className="hero-img actress" src="img/actress.png" alt="" />
        <h1 className="hero-title2">ИГРАЙ</h1>
      </div>

      <div className="about text-block">
        <div className="about-text-area">
          <h3>СОЗДАВАТЬ НОВОЕ ИСКУССТВО</h3>
          <p>idaFoundation - это образовательная платформа, которая предоставляет всем желающим бесплатное образование в области актерского, режиссерского и сценарного мастерства.</p>
        </div>
        <div className="about-pic-area">
          <img className="about-img clown" src="img/makeup_clown.png" alt="" />
        </div>
      </div>

      <div className="courses text-block">
        <div className="course-list-wrapper">
          <ul className="course-list">
            <li className="course-list-item">ТЕОРИЯ ЛИТЕРАТУРЫ</li>
            <li className="course-list-item">ТЕОРИЯ ЛИТЕРАТУРЫ</li>
            <li className="course-list-item">ТЕОРИЯ ЛИТЕРАТУРЫ</li>
            <li className="course-list-item">ТЕОРИЯ ЛИТЕРАТУРЫ</li>
            <li className="course-list-item">ТЕОРИЯ ЛИТЕРАТУРЫ</li>
          </ul>
          <span className="pink-btn course-list-btn">
            <a href="#">ВСЕ КУРСЫ</a>
          </span>
        </div>
        <div className="about-text-area">
          <h3>НАШИ КУРСЫ</h3>
          <p>научитесь создавать с нами</p>
        </div>
      </div>

      <Registration />
    </>
  )
}

export default Guest
