import React from 'react';

const Uncategorized = (props) => {
  
  return(
    <div className="scoreCard">
    <div className="scoreTitleImage">
      <h3>Uncategorized</h3>
      <img src={'/images/uncat.png'} />
    </div>
    <span>
    {props.uncatScore.score}% of your media sources are uncategorized
    </span>
    <p>
      The Republican Party, also referred to as the GOP (Grand Old Party), is one of the two major contemporary political parties in the United States,
      along with its main, historic rival, the Democratic Party.
    </p>
    <span className="smallerFont">Because you chose:
      {props.uncatScore.uncategorizedSources.join()}
    </span>
   
  </div>
  )
}

export default Uncategorized;