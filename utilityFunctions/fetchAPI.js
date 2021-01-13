//1-13-21: This file is not in use because NewsAPI does not allow using their free API on deployed servers.
// const {apiKey} = require("../apiKey")

async function fetchAPI(apiString) {
  let fetchResults = {}
  try{
    fetchResults = await fetch(apiString + `apiKey=${apiKey}`)
  }catch(error){
    console.error(error)
  }
  return await fetchResults.json()
}

async function getAllSources(){
  let sourcesData = []
  try{
    sourcesData = await fetchAPI('https://newsapi.org/v2/sources?')
  }catch(err){
    console.error(`There was an error fetching the sources: ${err}`)
  }

  return sourcesData.sources
}

export {
  getAllSources
}

