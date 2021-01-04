import React from 'react';

const Uncategorized = (props) => {
  
  return(
    <div className="scoreCard">
      <div className="singleScoreAndImage">
        <h1>{props.currentScore}% of your news sources are uncategorized.</h1>
        <img src={'/images/uncat.png'} />
      </div>
      <span className="scoreCardText">
      The GOP was founded in 1854 by opponents of the Kansas–Nebraska Act,[14] which allowed for the potential expansion of slavery into the western territories. The party supported classical liberalism, opposed the expansion of slavery, and supported economic reform.[15][16] Abraham Lincoln was the first Republican president. Under the leadership of Lincoln and a Republican Congress, slavery was banned in the United States in 1865. The Party was generally dominant during the Third Party System and the Fourth Party System. After 1912, the Party underwent a social ideological shift to the right.[17] Following the Civil Rights Act of 1964 and the Voting Rights Act of 1965, the party's core base shifted, with Southern states becoming more reliably Republican in presidential politics.[18] The party's 21st-century base of support includes people living in rural areas, men, the Silent Generation, and white evangelical Christians.[19][20][21][22]
      </span>
    </div>
  )
}

export default Uncategorized;