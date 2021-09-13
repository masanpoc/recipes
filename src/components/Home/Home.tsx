import React from "react";
import Searchbar from "./Searchbar/Searchbar";
import RecipesApi from "./RecipesApi/RecipesApi";
import Filters from "./Filters/Filters";

const Home = (): JSX.Element => {
  return (
    <div>
      <Searchbar />
      <Filters />
      <RecipesApi />
    </div>
  );
};

export default Home;
