import React from 'react'
import './style.css'
import FueledIcon from '../../assets/icon/Fueled-Emblem.svg'

export default function Header() {
  const [isLogined, setIsLogined] = React.useState(false)
  const [title, setTitle] = React.useState('')

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  return (
    <div className="headerDiv">
      <img src={FueledIcon} />
      <input
        value={title}
        onChange={(e: any) => handleTitleChange(e)}
        className="titleInput"
      />
      {!isLogined ? (
        <button className="loginBtn" onClick={() => setIsLogined(true)}>
          LOG IN
        </button>
      ) : (
        <div className="flex-div">
          <span className="mail-text">tom@fueled.com</span>
          <button className="logoutBtn" onClick={() => setIsLogined(false)}>
            LOG OUT
          </button>
        </div>
      )}
    </div>
  )
}
