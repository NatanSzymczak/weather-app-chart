import React from 'react';
import { Link } from 'react-router-dom';
import './ShowList.css';

const ShowList = ({ searchList }) => {
  console.log('Show: ', searchList);
  console.log('Type: ', typeof(searchList));
  return (
    <>{
      (Boolean(searchList.length)) &&
        <div className="typeAhead">
          <ul>{
            searchList.map(
              (curr,id) =>
                <Link to={`/weather/${curr}`}>
                  <li key={id}>{curr}</li>
                </Link>
            )
          }</ul>
        </div>
    }</>
  );
}

export default ShowList;