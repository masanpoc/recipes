import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "../../RecipeCard/RecipeCard";
import { SearchContext } from "../../App";
import mockResponse from "../../../data/searchResponse.json";
import { IData, IPrevious } from "../../../types/types";
import styled from "styled-components";
import { getFormattedQuery } from "../../../functions/getFormattedQuery";
import getFormattedQueryOfFilters from "../../../functions/getFormattedQueryOfFilters";
import { getRecipesArrFromResponse } from "../../../functions/getRecipesArrFromResponse";
import getFetchedData from "../../../functions/getFetchedData";

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: inset 0px 0px 1px 1px rgb(0 0 0 / 50%);
  width: 100%;
  @media(min-width: 768px){
    
  }
`

const StyledTitle = styled.h2`
  @media(min-width: 768px){
    font-size: 2em;
    margin: 4% 5% 6% 5%;
    overflow: hidden;
    width: max-content;
    box-shadow: 0 4px 0px 0px black;
  }
`

const StyledResultsDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 768px){
    display: grid;
    grid-gap: 3vw;
    grid-template-columns: repeat(auto-fit,minmax(min-content,17.5vw));
    justify-content: center;
    padding: 0;
  }
`;

const StyledButtonsDiv = styled.div`
  @media(min-width: 768px){
    margin: 9% 0 12.5% 0;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`

const PreviousButton = styled("button")<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? "" : "none")};
`;

const NextButton = styled("button")<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? "" : "none")};
`;
const initialResults = {
  nextPage: undefined,
  previousPage: undefined,
  recipes: undefined,
};

const Results = (): JSX.Element => {
  const { state } = useContext(SearchContext);
  const [currentUrl, setCurrentUrl] = useState<string>(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${getFormattedQuery(state.inputValue)}&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d&time=1-300${getFormattedQueryOfFilters(state.filters)}&imageSize=SMALL&random=false&field=uri&field=label&field=image&field=url&field=dietLabels&field=totalTime`
  );
  const [results, setResults] = useState<IData>(initialResults);
  const [previousLinks, setPreviousLinks] = useState<
    IPrevious | Record<string, never>
  >({});

  useEffect(() => {
    const getData = async () => {
      // console.log(currentUrl);
      // const data = await getFetchedData(currentUrl)
      const data = await mockResponse;
      const recipesArr = getRecipesArrFromResponse(data);
      // if we have next link --> set nextpage to url provided
      if (data._links.next) {
        // we have to store a previous link for the next link --> when we click next page, we can go back with our current url
        // we store by url reference
        // eg: 1st page: no previouspage only one nextpage, we can define that by looking at from prop in mockResponse
        if (data.from == 1) {
          setResults({
            recipes: recipesArr,
            previousPage: undefined,
            nextPage: data._links.next.href,
          });
          setPreviousLinks({
            ...previousLinks,
            [data._links.next.href]: currentUrl,
          });
        }
        // eg: 2nd page: we have nextpage defined and we need to store the previous page like so: previousPage: storedUrls.forCurrentUrl
        else {
          // we defined an object with the fetched url as forCurrentUrl prop value (previous page value)
          //  and with the nextPage link as the property name 'forCurrentUrl'
          setResults({
            recipes: recipesArr,
            nextPage: data._links.next.href,
            previousPage: results?.previousPage,
          });
          setPreviousLinks({
            ...previousLinks,
            [data._links.next.href]: currentUrl,
          });
        }
      }
      // if we don't have next link --> set nextpage to undefined and previous to forCurrenturl value
      else {
        setResults({
          recipes: recipesArr,
          previousPage: previousLinks[currentUrl],
          nextPage: undefined,
        });
        // we dont have to add new prop to previouslinks because we dont have next page
      }
      // const urls = ['', data._links.next.href]
    };
    getData();
  }, [currentUrl]);

  useEffect(() => {
    const keyword = getFormattedQuery(state.inputValue);
    const filterString = getFormattedQueryOfFilters(state.filters);
    setCurrentUrl(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${keyword}&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d&time=1-300${filterString}&imageSize=SMALL&random=false&field=uri&field=label&field=image&field=url&field=dietLabels&field=totalTime`
    );
  }, [state.inputValue, state.filters]);

  useEffect(() => {
    setResults({
      ...results,
      previousPage: previousLinks[currentUrl],
    });
  }, [previousLinks]);

  // useEffect(() => {
  //   console.log(results)
  // }, [results])

  function handlePreviousButton() {
    if (typeof results?.previousPage == "string") {
      setCurrentUrl(results?.previousPage);
    }
  }

  function handleNextButton() {
    if (typeof results?.nextPage == "string") {
      setCurrentUrl(results?.nextPage);
    }
  }

  return (
    <StyledWrapperDiv>
      <StyledTitle>Results for &#34;<i>{state.inputValue}</i>&#34;:</StyledTitle>
    <StyledResultsDiv>
      {results.recipes &&
        results?.recipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              source={recipe.source}
              time={recipe.time}
            />
          );
        })}
      
    </StyledResultsDiv>
    <StyledButtonsDiv>
        <PreviousButton
          isActive={results?.previousPage ? true : false}
          onClick={handlePreviousButton}
        >
          Previous
        </PreviousButton>
        <NextButton
          isActive={results?.nextPage ? true : false}
          onClick={handleNextButton}
        >
          Next
        </NextButton>
      </StyledButtonsDiv>
    </StyledWrapperDiv>
  );
};

export default Results;
