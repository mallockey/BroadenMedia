import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer';
import UsersSourceItem from '../components/UsersSourceItem.jsx';
import calcScore from '../utilityFunctions/calcScore.js';
import {getAllSources} from '../utilityFunctions/fetchAPI.js';
import SearchListItem from '../components/SearchListItem';
import Recommendation from '../components/Recomendation';
import ScoreCard from '../components/ScoreCard';
import { WorldMap } from "react-svg-worldmap";

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
    
    // const data =
    // [
    //   { country: "cn", value: 1389618778 }, // china
    //   { country: "in", value: 1311559204 }, // india
    //   { country: "us", value: 331883986 }
    // ]

    let countries = usersSources.map(source => source.country)
    let countryArr = []
    for(let i = 0; i < countries.length; i++){
      countryArr.push({
        country: countries[i],
        color: 'blue',
        value: 'yes'
      })
    }
    countryArr = new Set(countryArr)
    setUsersCountryCodes(countryArr)
  }

  useEffect(() => {

    async function getSources(){
      setAllSources(await getAllSources())
    }

    getSources()
    return () => {return true}
  },[])

  if(userScoreShow){
    return(
      <div id="main">
        <Header />
        <div id="scoreMain">
          <div id="scoreCardContainer">   
            <ScoreCard currentScore={usersScore.democratic} partyName={'democratic'} partyImage='demo'/>
            <ScoreCard currentScore={usersScore.republican} partyName={'republican'} partyImage='repub'/>
          </div>
          <div className="countryAndCat">
            <div>
              <h3>{ `Where your news comes from` }</h3>
              <WorldMap backgroundColor="#F8F8F8" color="blue" title='' value-suffix="people" size="lg" data={usersCountryCodes}/>
            </div>
            {usersScore.uncategorized.score > 0 ?
              <div>
                <h3>The rest of these news sources are uncategorized</h3>
                <p>
                  This does not mean they arent biased, it just means that we are unsure of their bias at this time
                </p>
                <span className="smallerFont">Because you chose:
                  {usersScore.uncategorized.uncategorizedSources.join()}
                </span>
              </div>
              :
              ''
            }
          </div>
          <Recommendation usersScore={usersScore} />
        </div>
      </div>
    )
  }else{
    return(
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
    )
  }
};

export default App
