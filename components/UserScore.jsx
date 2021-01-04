import React from 'react';
import Democratic from '../components/scoreCards/Democratic.jsx';
import countryCodeMap from '../data/countryCodes.js';
import Republican from './scoreCards/Republican.jsx';
import Uncategorized from './scoreCards/Uncategorized.jsx';

const UserScore = (props) => {

  let countries = props.usersSources.map(source => countryCodeMap[source.country.toUpperCase()])
  countries = [... new Set(countries)]

  return(
    <div id="usersScoreContainer">
      <div id="totalCountries">
        <p>
        <span id="countryText">You receive news from a total of {countries.length} {countries.length > 1 ? 'countries' : 'country'}</span>
        </p>
        <span>Insert image of hightlighted map here</span>
      </div>
      <div id="scoreCardContainer">
        <Democratic currentScore={props.usersScore[0]} />
        <Republican currentScore={props.usersScore[1]} />
        <Uncategorized currentScore={props.usersScore[2]} />
      </div>
    </div>
  )
};

export default UserScore