import React from "react";
import Searchbar from "./Searchbar/Searchbar";
import RecipesApi from "./RecipesApi/RecipesApi";
import Filters from "./Filters/Filters";
import styled from "styled-components";

const StyledHome = styled.div`
  min-height: 100vh;
`

const Home = (): JSX.Element => {
  return (
    <StyledHome>
      <Searchbar />
      <Filters />
      <RecipesApi />
    </StyledHome>
  );
};

export default Home;
