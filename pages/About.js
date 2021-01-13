import react from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const About = () => {
  return(
    <>
      <div id="main">
        <Header />
        <div id="homeMain">
          <p id="aboutPara">
            This site was built with the current state of US politics in mind. We believe that the only way to truth is by examining
            all perspectives and then coming to your own conclusion. Our determinations of each sources political affilation is determiend by
            <a id="aboutLink" href="https://allsides.com"> Allsides</a>
          </p>
        </div>
      <Footer />
      </div>
    </>
  )
}

export default About;