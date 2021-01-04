import React from 'react';

const Republican = (props) => {
  
  return(
    <div className="scoreCard">
      <div className="singleScoreAndImage">
        <h1>{props.currentScore}% of your news sources come from Republican media.</h1>
        <img src={'images/repub.png'} />
      </div>
      <span className="scoreCardText">
        The GOP was founded in 1854 by opponents of the Kansas–Nebraska Act,
        which allowed for the potential expansion of slavery into the western territories. 
        The party supported classical liberalism, opposed the expansion of slavery, and supported economic reform.
        Abraham Lincoln was the first Republican president. Under the leadership of Lincoln and a Republican Congress,
        slavery was banned in the United States in 1865. The Party was generally dominant during the Third Party System 
        and the Fourth Party System. After 1912, the Party underwent a social ideological shift to the right.
        Following the Civil Rights Act of 1964 and the Voting Rights Act of 1965, the party's core base shifted, 
        with Southern states becoming more reliably Republican in presidential politics.
        The party's 21st-century base of support includes people living in rural areas, men, the Silent Generation, and white evangelical Christians.
      </span>
    </div>
  )
}

export default Republican;