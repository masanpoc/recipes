import React, { useContext } from "react";
import { SearchContext } from "../App";
import Searchbar from "./Searchbar/Searchbar";
import Feed from "./Feed/Feed";
import Results from "./Results/Results";
import Filters from "./Filters/Filters";
import styled from "styled-components";

const StyledHome = styled.div`
  min-height: 100vh;
  width: 100%;
  background: rgba(220,220,220,0.28);
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-evenly;
  }
`

const Wrapper = styled.div`
border: 2px solid black;
  @media (min-width: 768px) { 
    width: 70%;
    overflow-x: hidden;
    margin: 10% 0;
    border: 5px solid black;
  }
`

const Home = (): JSX.Element => {
  const { state } = useContext(SearchContext);
  return (
    <StyledHome>
      
      <Filters />
      <Wrapper>
        <Searchbar />
        {state.inputValue == '' 
          ? 
          /* feed with mediterranean desserts etc */
          <Feed />
          :
          /* resyults from searchbar */
          <Results />
        }   
      </Wrapper>
    </StyledHome>
  );
};

export default Home;
