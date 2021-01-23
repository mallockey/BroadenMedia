import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer';
import UsersSourceItem from '../components/UsersSourceItem.jsx';
import calcScore from '../utilityFunctions/calcScore.js';
import SearchListItem from '../components/SearchListItem';
import Recommendation from '../components/Recomendation';
import ScoreCard from '../components/ScoreCard';
import { WorldMap } from 'react-svg-worldmap';
import manualSources from '../data/manualSources';
import newsApiSources from '../data/newsApiSources';

const App = () => {
  const [allSources, setAllSources] = useState(0);
  const [searchListItems, setSearchListItems] = useState([]);
  const [userScoreShow, setShowUserScore] = useState(false);
  const [usersScore, setUsersScore] = useState(0);
  const [usersSources, setUsersSources] = useState([]);
  const [usersCountryCodes, setUsersCountryCodes] = useState([]);
  const searchContainerDiv = useRef(null);

  function addToResultsContainer(source) {
    let usersSourcesNames = [];
    if (usersSources.length > 0) {
      //Get only the Sources names Ex: ABC News
      usersSourcesNames = usersSources.reduce(
        (allSourcesNames, currentSource) => {
          allSourcesNames.push(currentSource.name);
          return allSourcesNames;
        },
        []
      );
    }

    if (!usersSourcesNames.includes(source.name)) {
      setUsersSources([...usersSources, source]);
    }

    let searchInput = document.getElementById('mainSearchInput');
    searchInput.value = '';
    searchInput.focus();
  }

  function removeFromResultsContainer(source) {
    setUsersSources(
      usersSources.filter((arrSource) => arrSource.name !== source)
    );
  }

  function handleShowScore() {
    if (usersSources.length <= 0) {
      return;
    }
    setUsersScore(calcScore(usersSources));
    getCountryCodes();
    setShowUserScore(true);
  }

  async function handleSearchResults() {
    const searchDiv = document.getElementById('mainSearchInput');
    if (searchDiv.value === '') {
      setSearchListItems(null);
    }
    let searchResults = allSources.filter((source) =>
      source.name.toLowerCase().includes(searchDiv.value.toLowerCase()));
    setSearchListItems(searchResults);
  }

  function getCountryCodes() {
    let countryObj = {};
    usersSources.map((source) => {
      if (!countryObj.hasOwnProperty(source.country)) {
        countryObj[source.country] = {
          country: source.country,
          color: 'blue',
          value: [source.name],
        };
      } else {
        countryObj[source.country].value.push(source.name);
      }
      countryObj[source.country].value.toString();
    });

    setUsersCountryCodes(Object.values(countryObj));
  }

  useEffect(() => {
    async function getSources() {
      let temp = newsApiSources;
      temp = temp.concat(manualSources);
      setAllSources(temp);
    }

    getSources();
    return () => {
      return true;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [usersScore]);

  if (userScoreShow) {
    return (
      <>
        <Header />
        <div id="scoreMain">
          <div id="scoreCardContainer">
            <ScoreCard
              currentScore={usersScore.democratic}
              partyName="democratic"
              partyImage="demo"
            />
            <ScoreCard
              currentScore={usersScore.republican}
              partyName="republican"
              partyImage="repub"
            />
          </div>
          <div className="countryAndCat">
            <div>
              <h3>{`Your news comes from ${usersCountryCodes.length} ${
                usersCountryCodes.length === 1 ? 'country' : 'countries'
              }`}
              </h3>
              <WorldMap
                backgroundColor="#f8f8f8"
                color="green"
                title=""
                valuePrefix=": "
                size="xl"
                data={usersCountryCodes}
                frame={false}
                frameColor="#d34120"
              />
            </div>
            {usersScore.uncategorized.score > 0 ? (
              <div className="uncatScorePara">
                <h3>The rest of these news sources are uncategorized</h3>
                <p>
                  This does not mean they are unbiased but that they we are unsure
                  of their bias at this time.
                </p>
                <div className="smallerFont">
                  Because you chose:{' '}
                  <strong>{usersScore.uncategorized.uncategorizedSources.join()}</strong>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <Recommendation usersScore={usersScore} />
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Broaden MEdia</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:title" content="BroadenMEdia" />
          <meta property="og:image" content="/images/pageImage.PNG" />
          <meta property="og:url" content="https://broadenmedia.vercel.app/" />
          <meta
            property="og:description"
            content="A news source aggregator where users can input their news sources and are given a breakdown of each source by political affiliation."
          />
        </Head>
        <div id="main">
          <Header />
          <div id="homeMain">
            <div className="searchSection">
              <h3>Search below to get started!</h3>
              <div id="searchBar">
                <input
                  type="text"
                  className="mainSearchInput"
                  placeholder="Ex: ABC News, CNN"
                  onChange={handleSearchResults}
                  id="mainSearchInput"
                />
              </div>
              <div
                id="searchResultsContainer"
                ref={searchContainerDiv}
                className={
                  searchListItems.length > 0
                    ? 'searchResultsContainer'
                    : 'searchResultsContainerNoBorder'
                }
              >
                {searchListItems
                  ? searchListItems.map((source) => {
                      return (
                        <SearchListItem
                          source={source}
                          addToResultsContainer={addToResultsContainer}
                          key={Math.random()}
                        />
                      );
                    })
                  : ''}
              </div>
              {usersSources.length === 0 ? (
                <button
                  type="button"
                  disabled={true}
                  id="mainSearchBtn"
                  onClick={handleShowScore}
                >
                  Add some sources
                </button>
              ) : (
                <button
                  type="button"
                  id="mainSearchBtn"
                  onClick={handleShowScore}
                >
                  Show me my score from {usersSources.length} sources
                </button>
              )}
            </div>

            <div id="usersSourcesMainContainer">
              <h3>My News Sources</h3>
              <div id="usersSourcesContainer">
                {usersSources.length > 0
                  ? usersSources.map((source) => {
                      return (
                        <UsersSourceItem
                          source={source}
                          removeFromResultsContainer={
                            removeFromResultsContainer
                          }
                          key={Math.random()}
                        />
                      );
                    })
                  : 'No sources selected'}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
};

export default App;
