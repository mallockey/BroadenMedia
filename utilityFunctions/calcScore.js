function calcScore(allSources){
  const leftWingSources = ['ABC News', 'ABC News (AU)', 'CNN', 'CNN Spanish', 'Reddit /r/all']
  const rightWingSources = ['Fox News', 'The American Conservative', 'The Hill']

  let scoreObj = {
    republican : {
      republicanSources : [],
      score : 0
    },
    democratic : {
      democraticSources : [],
      score: 0
    },
    uncategorized : {
      uncategorizedSources : [],
      score: 0
    }
  }
  
  for(let i = 0; i < allSources.length; i++){
    if(leftWingSources.includes(allSources[i].name)){
      scoreObj.democratic.democraticSources.push(allSources[i].name)
      scoreObj.democratic.score++
    }else if (rightWingSources.includes(allSources[i].name)){
      scoreObj.republican.republicanSources.push(allSources[i].name)
      scoreObj.republican.score++
    }else{
      scoreObj.uncategorized.uncategorizedSources.push(allSources[i].name)
      scoreObj.uncategorized.score++
    }
  }

  scoreObj.democratic.score = Math.round((scoreObj.democratic.score / allSources.length) * 100)
  scoreObj.republican.score = Math.round((scoreObj.republican.score / allSources.length) * 100)
  scoreObj.uncategorized.score = Math.round((scoreObj.uncategorized.score / allSources.length) * 100)

  return scoreObj
}

export default calcScore;
