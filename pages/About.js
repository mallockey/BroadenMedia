import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
    <div id="aboutMain">
      <Header />
      <div id="aboutCenter">
        <p id="aboutPara">
          This site was built with the current state of US politics in mind. We
          believe that the only way to truth is by examining all perspectives
          and then coming to your own conclusion. Each sources political
          affilation is determined by
          <a id="aboutLink" href="https://allsides.com">
            {' '}
            Allsides.
          </a>
        </p>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default About;
