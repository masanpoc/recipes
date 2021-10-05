import React, { useContext, useEffect, useState } from "react";
import RecipeCard from "../../RecipeCard/RecipeCard";
import { SearchContext } from "../../App";
import mockResponse from "../../../data/searchResponse.json";
import { IData, IPrevious } from "../../../types/types";
import styled, {css} from "styled-components";
import { getFormattedQuery } from "../../../functions/getFormattedQuery";
import getFormattedQueryOfFilters from "../../../functions/getFormattedQueryOfFilters";
import { getRecipesArrFromResponse } from "../../../functions/getRecipesArrFromResponse";
import getFetchedData from "../../../functions/getFetchedData";
import { flexColumnBox, flexRowBox } from "../../../styles/mixins";

const StyledWrapperDiv = styled.div`
  ${flexColumnBox({})}
  display: flex;
  flex-direction: column;
  margin: 15% 0 50% 0;
  background: white;
  box-shadow: inset 0px 0px 1px 1px rgb(0 0 0 / 50%);
  width: 100%;
  @media (min-width: 768px) {
    margin: 6% 0;
    
  }
`

const StyledTitle = styled.h2`
  font-family: "MerriWeather";
  /* border: 1px solid black; */
  font-size: 2em;
  --w: 90;
  --mg-Y-Mobile: 0.15;
  --mg-Y-Desktop: 0.04;
  width: calc(var(--w) * 1%);
  margin: calc(var(--mg-Y-Mobile) * var(--w) * 1vw) 0 calc(var(--mg-Y-Mobile) * var(--w) * 1vw) 5%;
  @media (min-width: 768px) {
    margin: calc(var(--mg-Y-Desktop) * var(--w) * 1vw) 0 calc(var(--mg-Y-Desktop) * var(--w) * 1vw) 5%;
  }
`

const StyledResultsUl = styled.ul`
  --w: 90;
  --mb: 0.25;
  --mbEnd: 0.5;
  width: calc(var(--w) * 1%);
  & > * {
    margin-bottom: calc(var(--mb) * var(--w) * 1vw);
    /* margin-bottom: 25%; */
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  @media(min-width: 768px){
    display: grid;
    grid-gap: 3vw;
    grid-template-columns: repeat(auto-fit,minmax(min-content,17.5vw));
    justify-content: center;
    padding: 0;
    &  > * {
      margin-bottom: 0;
      /* margin-bottom: 25%; */
    }
    & > *:last-child {
    margin-bottom: 0;
  }
  }
`;

const StyledButtonsDiv = styled.div`
    margin: 20% 0 25% 0;
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
  @media(min-width: 768px){
    margin: 9% 0 12.5% 0;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`

const ButtonsStyle = ()=>css`
  box-shadow: inset 0px 0px 1px 1px rgb(0 0 0 / 50%);
    padding: 2%;
    border-radius: 5px;
    width: fit-content;
    cursor: pointer;
    margin: 0 4%;
    & > * {
      margin: 0 5px;
    }
  @media(min-width: 768px){
  ${flexRowBox({})};
    /* box-shadow: inset 0px 0px 1px 1px rgb(0 0 0 / 50%); */
    padding: 1% 1%;
    border-radius: 5px;
    width: fit-content;
    cursor: pointer;
    margin: 0 1.5%;
    & > * {
      margin: 0 2.5px;
    }
  }
`;

const PreviousButton = styled("button")<{ isActive: boolean }>`
  ${ButtonsStyle()}
  display: ${(props) => (!props.isActive && "none")};
  @media(min-width: 768px){
    display: ${(props) => (!props.isActive && "none")};
  }
`;

const NextButton = styled("button")<{ isActive: boolean }>`
  ${ButtonsStyle()}
  display: ${(props) => (!props.isActive && "none")};
  @media(min-width: 768px){
    display: ${(props) => (!props.isActive && "none")};
  }
`;

const StyledSVG = styled.svg`
      height: 12px;
    width: 12px;
`

const StyledSVGRotated=styled(StyledSVG)`
  transform: rotate(180deg);
`

const StyledButtonPreviousSpan = styled.span`
      font-size: 1.2em;
    
`

const StyledButtonNextSpan = styled(StyledButtonPreviousSpan)`
  
`

const initialResults = {
  nextPage: undefined,
  previousPage: undefined,
  recipes: undefined,
};

const Results = (): JSX.Element => {
  const { state } = useContext(SearchContext);
  const [currentUrl, setCurrentUrl] = useState<string>(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${getFormattedQuery(state.inputValue)}&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d${getFormattedQueryOfFilters(state.filters)}&time=1-500&imageSize=SMALL&random=false&field=uri&field=label&field=image&field=url&field=dietLabels&field=totalTime`
  );
  const [results, setResults] = useState<IData>(initialResults);
  const [previousLinks, setPreviousLinks] = useState<
    IPrevious | Record<string, never>
  >({});

  useEffect(() => {
    const getData = async () => {
      // console.log(currentUrl, 'new url');
      // console.log(state.filters, 'filters')
      console.log(getFormattedQueryOfFilters(state.filters), 'filters url')
      const data = await getFetchedData(currentUrl);
      console.log(data, 'data returned');
      // const data = await mockResponse;
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
    console.log(currentUrl, 'changing url')
  }, [currentUrl]);

  useEffect(() => {
    console.log(state.filters, 'new state filters')
    const keyword = getFormattedQuery(state.inputValue);
    const filterString = getFormattedQueryOfFilters(state.filters);
    setCurrentUrl(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${keyword}&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d${filterString}&time=1-500&imageSize=SMALL&random=false&field=uri&field=label&field=image&field=url&field=dietLabels&field=totalTime`
    );
  }, [state]);

  useEffect(() => {
    setResults({
      ...results,
      previousPage: previousLinks[currentUrl],
    });
  }, [previousLinks]);

  // useEffect(() => {
  //   console.log(results, 'results')
  // }, [results])

  function executeScroll() {
    const section = document.getElementById("scroll-ref");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handlePreviousButton() {
    if (typeof results?.previousPage == "string") {
      setCurrentUrl(results?.previousPage);
    }
    
    executeScroll();
  }

  function handleNextButton() {
    if (typeof results?.nextPage == "string") {
      setCurrentUrl(results?.nextPage);
    }
    executeScroll();

  }

  return (
    <StyledWrapperDiv>
      <StyledTitle>Results for &#34;<i>{state.inputValue}</i>&#34;:</StyledTitle>
    <StyledResultsUl>
      {results.recipes &&
        results?.recipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              source={recipe.source}
              time={recipe.time}
            />
          );
        })}
      
    </StyledResultsUl>
    <StyledButtonsDiv>
        <PreviousButton
          isActive={results?.previousPage ? true : false}
          onClick={handlePreviousButton}
        >
          <StyledSVGRotated xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></StyledSVGRotated>
          <StyledButtonPreviousSpan>Previous</StyledButtonPreviousSpan>
        </PreviousButton>
        <NextButton
          isActive={results?.nextPage ? true : false}
          onClick={handleNextButton}
        >
          <StyledButtonNextSpan>Next</StyledButtonNextSpan>
          <StyledSVG xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/></StyledSVG>
        </NextButton>
      </StyledButtonsDiv>
    </StyledWrapperDiv>
  );
};

export default Results;
