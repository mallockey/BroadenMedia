import React from 'react'

const Header = (props) => {
  return(
    <div id="header">
      <div className="header-item">
        <a href="/">
          <img
            id="site-logo"
            src="/images/logo-white.png"
          />
        </a>
      </div>
      <div className="header-item">
        <a href="/About">About</a>
      </div>
    </div>
  )
}

export default Header
