import React, {useState, useEffect, createContext, FC, useReducer, Dispatch} from "react";
import RecipesApi from "./RecipesApi/RecipesApi";
import Searchbar from "./Searchbar/Searchbar";
import { searchValueReducer, IState } from "../reducers/searchValueReducer";

interface IContextProps {
  state: IState;
  dispatch: Dispatch<any>;
}

export const SearchContext = createContext({} as IContextProps);

const App: FC = () => {

  const [loading, setLoading] = useState(true);
  const initialSearchValue = {inputValue: 'heyyy'};
  const [state, dispatch] = useReducer(searchValueReducer, initialSearchValue)

  useEffect(() => {
    // setTimeout(()=>{setLoading(false)}, 2000);
    setLoading(false);
  }, [])

  return (loading ? (null) : (
    <SearchContext.Provider value={{state, dispatch}}>
    <div>
      <h2>My portfolio</h2>
      <h3>dd</h3>
      <Searchbar />
      <RecipesApi />
      <div id="edamam-badge" data-color="white"></div>
    </div>
    </SearchContext.Provider>
  ));

};

export default App;
