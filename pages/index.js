import React, { useEffect, useState } from 'react';
import Header from '../components/Header.jsx';
import UserScore from '../components/UserScore.jsx';
import UsersSourceItem from '../components/UsersSourceItem.jsx';
import calcScore from '../utilityFunctions/calcScore.js';
import {getAllSources} from '../utilityFunctions/fetchAPI.js';
import SearchListItem from '../components/SearchListItem';
import Footer from '../components/Footer';

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

  return(
    <div id="homeContainer">
      <Header />
          <span><h2>My News Sources are:</h2></span>
          <div id="usersSourcesContainer">
            {usersSources.length > 0 ? usersSources.map(source => {
              return <UsersSourceItem
                      source={source}
                      removeFromResultsContainer={removeFromResultsContainer}
                      key={Math.random()}
                    />
            }) :'Search for your news sources below to get started!'}
          </div>
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
          <a href ="#totalCountries">
          <button type="button" id="mainSearchBtn" onClick={handleShowScore}>Show me my score</button>
          </a>
          {userScoreShow ? <UserScore usersSources={usersSources} usersScore={usersScore} /> : ''}
        <Footer />
    </div>
  )
};

export default App
