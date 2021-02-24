import React, { useEffect, useState } from 'react'
import WinCloseIcon from './Icons/WinCloseIcon'
import WinMaximizeIcon from './Icons/WinMaximizeIcon'
import WinMinimizeIcon from './Icons/WinMinimizeIcon'
import WinRestoreIcon from './Icons/WinRestoreIcon'
const rootClassName = 'title-bar-component'
const buttonClassName = 'title-bar-button-component'

// eslint-disable-next-line no-undef
const { remote } = require('electron')
const window = remote.getCurrentWindow()

// eslint-disable-next-line react/prop-types
const TitleBarButton = ({ icon, onClick }) => (
  <div className={buttonClassName} onClick={onClick}>
    {icon}
  </div>
)

export default function TitleBar() {
  const getMidButton = () =>
    window.isMaximized()
      ? { component: <WinRestoreIcon />, maximized: true }
      : { component: <WinMaximizeIcon />, maximized: false }
  const [midButton, setMidButton] = useState(getMidButton())
  useEffect(() => {
    window.addListener('resize', () => setMidButton(getMidButton()))
    return () => {
      window.removeListener('resize', () => setMidButton(getMidButton()))
    }
  }, [])
  return (
    <div className={rootClassName}>
      <div className={`${rootClassName}-center-content`}>Title</div>
      <div className={`${rootClassName}-right-content`}>
        <TitleBarButton
          icon={<WinMinimizeIcon />}
          onClick={() => window.minimize()}
        />
        <TitleBarButton
          icon={midButton.component}
          onClick={() => {
            if (window.isMaximized()) {
              window.restore()
            } else {
              window.maximize()
            }
          }}
        />
        <TitleBarButton
          icon={<WinCloseIcon />}
          onClick={() => window.close()}
        />
      </div>
    </div>
  )
}
