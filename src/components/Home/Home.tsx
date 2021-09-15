import React, { useContext } from "react";
import { SearchContext } from "../App";
import Searchbar from "./Searchbar/Searchbar";
import Feed from "./Feed/Feed";
import Results from "./Results/Results";
import Filters from "./Filters/Filters";
import styled from "styled-components";

const StyledHome = styled.div`
  min-height: 100vh;
  @media (min-width: 768px) {
    display: flex;
  }
`

const Home = (): JSX.Element => {
  const { state } = useContext(SearchContext);
  return (
    <StyledHome>
      
      <Filters />
      <div>
        <Searchbar />
        {state.inputValue == '' 
          ? 
          /* feed with mediterranean desserts etc */
          <Feed />
          :
          /* resyults from searchbar */
          <Results />
        }   
      </div>
    </StyledHome>
  );
};

export default Home;
