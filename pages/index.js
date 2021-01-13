import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer';
import UsersSourceItem from '../components/UsersSourceItem.jsx';
import calcScore from '../utilityFunctions/calcScore.js';
import SearchListItem from '../components/SearchListItem';
import Recommendation from '../components/Recomendation';
import ScoreCard from '../components/ScoreCard';
import { WorldMap } from "react-svg-worldmap";
import manualSources from '../data/manualSources';
import newsApiSources from '../data/newsApiSources'

const App = () => {
  const [allSources, setAllSources] = useState(0);
  const [searchListItems, setSearchListItems] = useState([])
  const [userScoreShow, setShowUserScore] = useState(false);
  const [usersScore, setUsersScore] = useState(0);
  const [usersSources, setUsersSources] = useState([])
  const [usersCountryCodes, setUsersCountryCodes] = useState([])

  function addToResultsContainer(source){

    let usersSourcesNames = []
    if(usersSources.length > 0){//Get only the Sources names Ex: ABC News
      usersSourcesNames = usersSources.reduce((allSourcesNames, currentSource) => {
        allSourcesNames.push(currentSource.name)
        return allSourcesNames
      }, [])
    }

    if(!usersSourcesNames.includes(source.name)){
      setUsersSources([...usersSources,source])
    }
  }

  function removeFromResultsContainer(source){
    setUsersSources(usersSources.filter(arrSource => arrSource.name !== source ))
  }

  function handleShowScore(){
    if(usersSources.length <= 0){
      return
    }
    setUsersScore(calcScore(usersSources));
    getCountryCodes()
    setShowUserScore(true);
  }

  async function handleSearchResults(){
    const searchDiv = document.getElementById("mainSearchInput")

    if(searchDiv.value === ''){
      setSearchListItems([])
      return
    }

    let searchResults = allSources.filter(source => source.name.toLowerCase().includes(searchDiv.value.toLowerCase()))
    setSearchListItems(searchResults)
  }

  function getCountryCodes(){
    
    let countryObj = {}
    usersSources.map(source => {
      if(!(countryObj.hasOwnProperty(source.country))){
        countryObj[source.country] = {
          country: source.country,
          color: 'blue',
          value: [source.name]
        }
      }else{
        countryObj[source.country].value.push(source.name)
      }

      countryObj[source.country].value.toString()
    })

    setUsersCountryCodes(Object.values(countryObj))
  }

  useEffect(() => {

    async function getSources(){
      let temp = newsApiSources
      temp = temp.concat(manualSources)
      setAllSources(temp)
    }
    
    getSources()
    return () => {return true}
  },[])

  if(userScoreShow){
    return(
      <>
        <Header />
        <div id="scoreMain">
          <div id="scoreCardContainer">   
            <ScoreCard currentScore={usersScore.democratic} partyName={'democratic'} partyImage='demo'/>
            <ScoreCard currentScore={usersScore.republican} partyName={'republican'} partyImage='repub'/>
          </div>
          <div className="countryAndCat">
            <div>
              <h3>{ `Your news comes from ${usersCountryCodes.length} ${usersCountryCodes.length === 1 ? 'country' : 'countries'}` }</h3>
              <WorldMap backgroundColor="#F8F8F8" color="blue" title='' valuePrefix={': '} size="lg" data={usersCountryCodes} frame={true} frameColor={'#C0C0C0'} />
            </div>
            {usersScore.uncategorized.score > 0 ?
              <div className="scorePara">
                <h3>The rest of these news sources are uncategorized</h3>
                <p>
                  This does not mean they are unbiased just they we are unsure of their bias at this time.
                </p>
                <div className="smallerFont">Because you chose:
                  <b>{usersScore.uncategorized.uncategorizedSources.join()}</b>
                </div>
              </div>
              :
              ''
            }
          </div>
          <Recommendation usersScore={usersScore} />
        </div>
        <Footer />
      </>

    )
  }else{
    return(
      <>
      <div id="main">
        <Header />
          <div id="homeMain">
            <div>
            <h3>Search below to get started!</h3>
            <div id="searchBar">
              <input type="text" className="mainSearchInput"
                placeholder="Ex: Fox News, CNN"
                onChange={handleSearchResults}
                id="mainSearchInput">
              </input>
            </div>
            <div id="searchResultsContainer">
              {searchListItems ? searchListItems.map(source => {
                return <SearchListItem source={source}
                        addToResultsContainer={addToResultsContainer}
                        key={Math.random()}
                      />
              }) : ''}
            </div>
              {
                usersSources.length === 0 ?
                  <button type="button" 
                    disabled={true}
                    id="mainSearchBtn" 
                    onClick={handleShowScore}>Add some sources
                  </button>
                :
                  <button type="button" 
                    id="mainSearchBtn" 
                    onClick={handleShowScore}>Show me my score from {usersSources.length} sources
                  </button>
              }
            </div>
              <div id="usersSourcesMainContainer">
                <div id="usersSourcesContainer">
                  <h3>My News Sources:</h3>
                  {usersSources.length > 0 ? usersSources.map(source => {
                    return <UsersSourceItem
                            source={source}
                            removeFromResultsContainer={removeFromResultsContainer}
                            key={Math.random()}
                          />
                  }) :'No sources selected'}
                </div>
              </div>
            </div>
          <Footer />
      </div>
      </>
    )
  }
};

export default App
