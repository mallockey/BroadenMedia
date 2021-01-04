function calcScore(allSources){
  const leftWingSources = ['ABC News', 'ABC News (AU)', 'CNN', 'CNN Spanish', 'Reddit /r/all']
  const rightWingSources = ['Fox News', 'The American Conservative', 'The Hill']

  let leftWingScore = 0;
  let rightWingScore = 0;
  let uncategorizedScore = 0;

  for(let i = 0; i < allSources.length; i++){
    if(leftWingSources.includes(allSources[i].name)){
      leftWingScore++
    }else if (rightWingSources.includes(allSources[i].name)){
      rightWingScore++
    }else{
      uncategorizedScore++
    }
  }

  leftWingScore = leftWingScore / allSources.length * 100;
  rightWingScore = rightWingScore / allSources.length * 100;
  uncategorizedScore = uncategorizedScore / allSources.length * 100;

  return [Math.round(leftWingScore),Math.round(rightWingScore),Math.round(uncategorizedScore)]
}

export default calcScore;
