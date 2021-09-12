import React, {useState, useEffect, createContext, useReducer, Dispatch, lazy, Suspense  } from "react";
import Details from "./Details/Details";
import {searchValueReducer, IState} from '../reducers/searchValueReducer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
const Home = lazy(()=>import("./Home/Home"));

interface IContextProps {
  state: IState;
  dispatch: Dispatch<any>;
}

export const SearchContext = createContext({} as IContextProps);

const App = (): JSX.Element | null  => {

  const [loading, setLoading] = useState(true);
  
  const initialSearchValue = {inputValue: 'heyyy'};
  const [state, dispatch] = useReducer(searchValueReducer, initialSearchValue)

  // const contextValue = useMemo(() => {
  //   return { state, dispatch };
  // }, [state, dispatch]);

  useEffect(() => {
    // setTimeout(()=>{setLoading(false)}, 2000);
    setLoading(false);
  }, [])


  return (loading ? (null) : (
    <Router>
      <SearchContext.Provider value={{state, dispatch}}>
        <div>
          <h2>My portfolio</h2>
          <h3>dd</h3>
          <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/details">
              <Details data={state.inputValue} />
            </Route>
            <Redirect from="*" to="/home" />
          </Switch>
          </Suspense>
          <Link to="/details" >Details page</Link>
          <Link to="/home" >Home page</Link>
          <div id="edamam-badge" data-color="white"></div>
        </div>
      
      </SearchContext.Provider>
    </Router>
  ));

};

export default App;
