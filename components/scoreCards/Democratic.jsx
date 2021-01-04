import React from 'react';

const Democratic = (props) => {
  
  return(
    <div className="scoreCard">
      <div className="singleScoreAndImage">
        <h1>{props.currentScore}% of your news sources come from democratic media.</h1>
        <img src={'/images/demo.png'} />
      </div>
      <span className="scoreCardText">
        The Democratic Party's philosophy of modern liberalism blends notions of civil liberty and social equality with support for a mixed economy.
        In Congress, the party is a big-tent coalition with influential centrist, progressive, and conservative wings. 
        Corporate governance reform, environmental protection, support for organized labor, expansion of social programs, 
        affordable college tuition, universal health care, equal opportunity, 
        and consumer protection form the core of the party's economic agenda.
        On social issues, it advocates campaign finance reform, LGBT rights, criminal justice and immigration reform, stricter gun laws, abortion rights,
        and the legalization of marijuana.
      </span>
    </div>
  )
}

export default Democratic;