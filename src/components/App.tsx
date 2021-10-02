import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  Dispatch,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { resultsReducer, IState } from "../reducers/resultsReducer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
const Home = lazy(() => import("./Home/Home"));
const Details = lazy(() => import("./Details/Details"));

interface IContextProps {
  state: IState;
  dispatch: Dispatch<any>;
}

export const SearchContext = createContext({} as IContextProps);

const App = (): JSX.Element | null => {
  const [loading, setLoading] = useState(true);

  const initialSearchValue = {
    inputValue: "dd",
    filters: {
      mealType: [],
      dishType: [],
      health: ["vegan"],
      cuisineType: [],
      diet: [],
    },
    links: [],
  };
  const [state, dispatch] = useReducer(resultsReducer, initialSearchValue);

  // const contextValue = useMemo(() => {
  //   return { state, dispatch };
  // }, [state, dispatch]);

  useEffect(() => {
    // setTimeout(()=>{setLoading(false)}, 2000);
    setLoading(false);
  }, []);

  return loading ? null : (
    <Router>
      <SearchContext.Provider value={{ state, dispatch }}>
        <div id='scroll-ref'>
          <Header />
          <Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/details">
                <Details data={state.inputValue} />
              </Route>
              <Redirect from="*" to="/home" />
            </Switch>
          </Suspense>
          {/* <Link to="/details">Details page</Link>
          <Link to="/home">Home page</Link> */}
          <Footer />
        </div>
      </SearchContext.Provider>
    </Router>
  );
};

export default App;
