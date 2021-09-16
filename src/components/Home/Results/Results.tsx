import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../App";
import mockResponse from '../../../data/searchResponse.json';
import { IData } from "../../../types/types";
import styled from "styled-components";
import { getFormattedQuery } from "../../../functions/getFormattedQuery";
import { getRecipesArrFromResponse } from "../../../functions/getRecipesArrFromResponse";
import getFetchedData from "../../../functions/getFetchedData";

const FlexyDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Results = (): JSX.Element => {
  const { state } = useContext(SearchContext);
  const [results, setResults] = useState< IData | undefined >(undefined);
  
  useEffect(() => {
    if(state.inputValue){
      const getData = async () => {
        // const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${getFormattedQuery(state.inputValue)}&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d&time=1-300&imageSize=SMALL&random=false&field=uri&field=label&field=image&field=url&field=dietLabels&field=totalTime`;
        // const data = await getFetchedData(url)
        const data = mockResponse;
        const recipesArr = getRecipesArrFromResponse(data);
        if(data._links.next) {
          setResults({
            recipes: recipesArr,
            nextPage: data._links.next.href
          })
        } else {
          setResults({
            recipes: recipesArr,
            nextPage: null
          })
        }
      }
      getData()
    }
  }, [state.inputValue, state.filters])

  // useEffect(() => {
  //   console.log(results)
  // }, [results])

  return <FlexyDiv>
    {results?.recipes.map((recipe)=> {
      return (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image}></img>
          <a href={recipe.source} rel='noreferrer' target='_blank' >Go to Recipe</a>
          <h5>{recipe.time}</h5>
        </div>
      )
    })}
  </FlexyDiv>;
};

export default Results;
