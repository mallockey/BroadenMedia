import React from 'react'

const ScoreCard = (props) => {

  const partyDesc = {
    republican: "The Republican Party, also referred to as the GOP (Grand Old Party), \
                 is one of the two major contemporary political parties in the United States \
                 along with its main, historic rival, the Democratic Party.",
    democratic: "The Democratic Party's philosophy of modern liberalism blends notions of civil liberty and social equality with support for a mixed economy.",
    uncategorized : 'You are a true patriot'
  }

  return(
    <div className="scoreCard">
    <div className="scoreTitleImage">
      <h3>{props.partyName.toUpperCase()}</h3>
      <img src={`/images/${props.partyImage}.png`} />
    </div>
    <span>
      {props.currentScore.score}% of your media sources from {props.partyName} sources
    </span>
    <p>
      {partyDesc[props.partyName]}
    </p>
   <span className="smallerFont">Because you chose:
    {props.currentScore[`${props.partyName}Sources`].join()}
   </span>
  </div>
  )
}

export default ScoreCard