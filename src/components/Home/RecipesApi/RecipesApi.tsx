import React, { useContext } from "react";
import { SearchContext } from "../../App";

const RecipesApi = (): JSX.Element => {
  const { state } = useContext(SearchContext);
  return <div>{state.inputValue}</div>;
};

export default RecipesApi;
