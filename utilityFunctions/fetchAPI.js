const apiKey = process.env.NEXT_PUBLIC_apiKey

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

