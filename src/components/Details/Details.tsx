import React from "react";
import {Link} from 'react-router-dom'

// the component takes the id from route params and fetches that recipe to render it
// to go back means to fetch results from specific query and page (again) --> go to home

type Props = {
  match: {
    params: {
      id: string;
    };
  };
};

const Details = ({match}:Props): JSX.Element => {



  return (
    <div>
      <Link to="/home">Home page</Link>
      details
      {match.params.id}
    </div>
  );
};

export default Details;
