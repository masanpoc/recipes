import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../App";
import mockResponse from '../../../data/searchResponse.json';
import { IResults } from "../../../types/types";
import styled from "styled-components";

function getFormattedQuery(str:string):string {
  str=str.trim();
  let strArr:string[] = str.split(' ');
  strArr = strArr.map((query:string, i:number)=>{
    if(i==0) return query
    return '%20'+query
  })
  return strArr.join('');
}

const FlexyDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Results = (): JSX.Element => {
  const { state } = useContext(SearchContext);
  const [results, setResults] = useState< IResults | undefined >(undefined);
  
  useEffect(() => {
    if(state.inputValue){
      const getData = async () => {
        const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${getFormattedQuery(state.inputValue)}&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d&time=1-300&imageSize=REGULAR&random=false&field=uri&field=label&field=image&field=url&field=dietLabels&field=totalTime`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.hits, data.hits[0].uri);
        const recipesArr = data.hits.map((el: { recipe: { uri: string; label: string; image: string; url: string; totalTime: number; }; })=>{
          return {
            id: el.recipe.uri,
            title: el.recipe.label,
            image: el.recipe.image,
            source: el.recipe.url,
            time: el.recipe.totalTime
          }
        })
        console.log(recipesArr);
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

  useEffect(() => {
    console.log(results)
  }, [results])

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
