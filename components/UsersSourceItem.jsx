import React, {useState} from 'react';
import countryCodeMap from '../data/countryCodes';

const UsersSourceItem = (props) => {
  const [hover, setHover] = useState(false);

  function handleOnHover(){
    setHover(!hover);
  }
  return (
    <>
    {hover ?
        <button
          type="button"
          className="usersSourceItem"
          onMouseLeave={
            handleOnHover
          }
        onClick={() =>
          props.removeFromResultsContainer(props.source.name)}
          >
        {props.source.name}
        <br />
        <span className="removeSpan">Click to remove</span>
        </button>
    :
      <button
        type="button"
        className="usersSourceItem"
        onMouseOver={
          handleOnHover
        }
        onClick={() =>
          props.removeFromResultsContainer(props.source.name)}
        >
        {props.source.name}
        <br />
        <span className="removeSpan">{countryCodeMap[props.source.country.toUpperCase()]}</span>
      </button>
    }
    </>
  );
};

export default UsersSourceItem;
