import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <div id="footer">
      <span className="footerSources">
        <a href="https://jplate-frontend.vercel.app/">jPlate</a>
        <a href="https://github.com/mallockey">Github</a>
        <a href="https://newsapi.org/">Powered by NewsAPI</a>
        <a href="https://www.linkedin.com/in/joshuamelo1/">LinkedIn</a>
      </span>
      <span>Copyright © {date} Joshua Melo. All rights reserved.</span>
    </div>
  )
}

export default Footer
