import React from 'react'

const ScoreCard = (props) => {

  const partyDesc = {
    republican: "The Republican Party, also referred to as the GOP (Grand Old Party), \
                 is one of the two major contemporary political parties in the United States \
                 along with its main, historic rival, the Democratic Party.",
    democratic: "The Democratic Party's philosophy of modern liberalism blends notions of civil liberty and social equality with support for a mixed economy."
  }

  return(
    <div className='scoreCard'>
    <div className="scoreTitleImage">
      <h3 className={`${props.partyName}Header`}>{props.partyName.charAt(0).toUpperCase() + props.partyName.slice(1)}</h3>
      <img src={`/images/${props.partyImage}.png`} />
    </div>
    <span>
      {props.currentScore.score}% of your media sources come from {props.partyName} sources
    </span>
      <div className="scorePara">
        <p>{partyDesc[props.partyName]}</p>
      </div>
    {props.currentScore[`${props.partyName}Sources`].length > 0 ? 
      <span className="smallerFont">Because you chose:
        <b>{props.currentScore[`${props.partyName}Sources`].join()}</b>
      </span>
    : ''
  }
  </div>
  )
}

export default ScoreCard