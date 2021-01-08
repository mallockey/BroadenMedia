import React from 'react';

const Republican = (props) => {
  return(
    <div className="scoreCard">
      <div className="scoreTitleImage">
        <h3>Republican Party</h3>
        <img src={'/images/repub.png'} />
      </div>
      <span>
        {props.repubScore.score}% of your media sources from right wing sources
      </span>
      <p>
        The Republican Party, also referred to as the GOP (Grand Old Party), is one of the two major contemporary political parties in the United States,
        along with its main, historic rival, the Democratic Party.
      </p>
    </div>
  )
}

export default Republican;