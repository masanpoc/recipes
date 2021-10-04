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
import GA4React from 'ga-4-react'
import CookieConsent, { Cookies, getCookieConsentValue, resetCookieConsentValue  } from "react-cookie-consent";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
const Home = lazy(() => import("./Home/Home"));
const Details = lazy(() => import("./Details/Details"));

const gaReact = new GA4React('G-3JWZVWRSLV');
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

    resetCookieConsentValue();
    // const isConsent = getCookieConsentValue();
    // if (isConsent === "true") {
    //   handleAcceptCookie();
    // }
  }, []);

  function handleAcceptCookie() {
    // console.log(process.env.NODE_ENV)
    if(process.env.NODE_ENV=='production'){
      gaReact.initialize();
    }
  }

  function handleDeclineCookie() {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  }

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
          <CookieConsent
              enableDeclineButton
              onAccept={handleAcceptCookie}
              onDecline={handleDeclineCookie}
              flipButtons
              style={{
                background: 'rgb(11 59 100)', 
                flexWrap: 'nowrap',
                flexDirection: 'column',
                padding: '1%'
              }}
              buttonStyle={{
                background: 'white',
                
              }}
              declineButtonStyle={{
                background: 'rgb(130 130 130 / 71%)'
              }}
              contentStyle={{
                flex: '1 1 auto'
              }}
          >        
          This website uses cookies to enhance the user experience.
          </CookieConsent>
        </div>
      </SearchContext.Provider>
    </Router>
  );
};

export default App;
