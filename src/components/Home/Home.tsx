import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "../App";
import Searchbar from "./Searchbar/Searchbar";
import Feed from "./Feed/Feed";
import Results from "./Results/Results";
import Filters from "./Filters/Filters";
import styled from "styled-components";

const StyledHome = styled.div`
  min-height: 100vh;
  width: 100%;
  background: rgba(220, 220, 220, 0.28);
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-evenly;
  }
`;

const Wrapper = styled.div`
  @media (min-width: 768px) {
    width: 66%;
    margin: 2.5% 0;
  }
`;

const Home = (): JSX.Element => {
  const { state } = useContext(SearchContext);

  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    // console.log("rerendered");
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  return (
    // we could be moving the searchcontext here as we dont need it wrapping details.tsx as we can just pass the id through route params and it can fetch the info needed
    // wrong? => how do we fetch back the info? when user leaves details and goes back to home (results), we could go back through params url but we loose every filter checked!,
    // it is easier to have the context and mantain previous/next links + filters applied + search value than to exctract those from route params
    // BUT, we can't use searchcontext in filters for example (it results in memory leak), so we do need to mantain the page as it was between routes
    // so we could look for a solution with searchcontext inside wrapper and then it wont rerender between routs and details just uses the recipe id and fetches info
    <StyledHome>
      <Filters width={width} />
      <Wrapper>
        {/* I could have here the searchcontext */}
        <Searchbar />
        {state.inputValue == "" ? (
          /* feed with mediterranean desserts etc */
          <Feed width={width} />
        ) : (
          /* results from searchbar */
          // but if we have searchcontext excluding
          //  Filters.tsx =>  it would not be able to share the users filters with searchbar as we are passing the filters state through searchcontext dispatch to searchbar
          <Results />
        )}
      </Wrapper>
    </StyledHome>
  );
};

export default Home;
