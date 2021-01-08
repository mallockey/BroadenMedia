import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import UserScore from '../components/UserScore.jsx';
import UsersSourceItem from '../components/UsersSourceItem.jsx';
import calcScore from '../utilityFunctions/calcScore.js';
import {getAllSources} from '../utilityFunctions/fetchAPI.js';
import SearchListItem from '../components/SearchListItem';
import Footer from '../components/Footer';
import CommonSources from '../components/CommonSources';
import Democratic from '../components/scoreCards/Democratic.jsx';
import Republican from '../components/scoreCards/Republican.jsx';
import Uncategorized from '../components/scoreCards/Uncategorized.jsx';

const App = () => {
  const [allSources, setAllSources] = useState(0);
  const [searchListItems, setSearchListItems] = useState([])
  const [userScoreShow, setShowUserScore] = useState(false);
  const [usersScore, setUsersScore] = useState(0);
  const [usersSources, setUsersSources] = useState([])

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
    setShowUserScore(true);
  }

  async function handleSearchResults(){
    const searchDiv = document.getElementById("mainSearch")

    if(searchDiv.value === ''){
      setSearchListItems([])
      return
    }

    let searchResults = allSources.filter(source => source.name.toLowerCase().includes(searchDiv.value.toLowerCase()))
    setSearchListItems(searchResults)
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
        <div id="scoreCardContainer">
          {console.log(usersScore.republican)}
          
            <Democratic demoScore={usersScore.democratic} />
            <Republican repubScore={usersScore.republican} />
            <Uncategorized uncatScore={usersScore.uncategorized} />
        </div>
          <Footer />
      </div>
    )
  }else{
    return(
      <div id="main">
        <Header />
          <div id="mainContainer">
            <div id="mainSearchContainer">
            <h3>Search below to get started!</h3>
            <div id="searchBar">
              <input type="text" className="mainSearch"
                placeholder="Ex: Fox News, CNN"
                onChange={handleSearchResults}
                id="mainSearch">
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
                    disabled="true" 
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
