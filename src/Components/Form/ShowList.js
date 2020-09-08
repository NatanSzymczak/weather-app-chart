import React from 'react';
import { Link } from 'react-router-dom';
import './ShowList.css';

const ShowList = ({ searchList }) => {
  return (
    <>{
      (Boolean(searchList.length)) &&
        <div className="typeAhead">
          <ul>{
            searchList.map(
              (curr,id) =>
                <Link key={id} to={`/weather/${curr}`}>
                  <li>{curr}</li>
                </Link>
            )
          }</ul>
        </div>
    }</>
  );
}

export default ShowList;