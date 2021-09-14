import React from "react";
import Searchbar from "./Searchbar/Searchbar";
import RecipesApi from "./RecipesApi/RecipesApi";
import Filters from "./Filters/Filters";
import styled from "styled-components";

const StyledHome = styled.div`
  min-height: 100vh;
  @media (min-width: 768px) {
    display: flex;
  }
`

const Home = (): JSX.Element => {
  return (
    <StyledHome>
      
      <Filters />
      <div>
        <Searchbar />
        {/* feed with mediterranean desserts etc */}
        <RecipesApi />
        {/* resyults from searchbar */}
      </div>
    </StyledHome>
  );
};

export default Home;
