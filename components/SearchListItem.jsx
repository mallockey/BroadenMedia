import React from 'react';
import countryCodeMap from '../data/countryCodes';

const SearchListItem = (props) => {
  return (
    <div className="searchItem" onClick={() =>
      props.addToResultsContainer(props.source)}>
      <div>
        {props.source.name}
        <br />
        <span className="searchCountry">{countryCodeMap[props.source.country.toUpperCase()]}</span>
      </div>
      <button
        type="button" onClick={() =>
        props.addToResultsContainer(props.source)} className="searchItemBtn">+
      </button>
    </div>
  );
};

export default SearchListItem;
