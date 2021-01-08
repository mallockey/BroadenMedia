import React from 'react';

const Democratic = (props) => {
  
  return(
    <div className="scoreCard">

      <div className="scoreTitleImage">
        <h3>Democratic Party</h3>
        <img src={'/images/demo.png'} />
      </div>
      <span>
        {props.demoScore.score}% of your media sources from left wing sources
      </span>
      <p>
        The Democratic Party's philosophy of modern liberalism blends notions of civil liberty and social equality with support for a mixed economy.
      </p>
     <span className="smallerFont">Because you chose:
      {props.demoScore.democraticSources.join()}
     </span>
    </div>
  )
}

export default Democratic;