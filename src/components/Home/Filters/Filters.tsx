import React, {
  createContext,
  useState,
  Dispatch,
  useReducer,
  useContext,
  useEffect,
} from "react";
import styled from "styled-components";
import CheckboxList from "./subcomponents/CheckboxList";
import optionsList from "./lists/optionsList";
// import { IForm } from '../../../types/types';
import { formReducer } from "../../../reducers/formReducer";
import { SearchContext } from "../../App";

const StyledFilters = styled("form")<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background: ${(props) => (props.isActive ? "palevioletred" : "white")};
  @media (min-width: 768px) {
    border: 5px solid green;
    width: 20%;
    
  }
`;

const StyledDropdownDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`

const StyledDropdownSVG = styled.svg`
    height: 24px;
    width: 24px;
`

const StyledClearButton = styled.button`
    width: fit-content;
    height: auto;
    background: white;
    color: #4B4B4B;
    border: 1px solid grey;
    
`

const StyledCloseSVG = styled.svg`
    height: 15px;
    width: 15px;
    fill: #787878;
`

const StyledMobileTitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledDesktopTitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledMobileTitleH2 = styled.h2`

`

const StyledDesktopTitleH2 = styled.h2`

`

const StyledApplyButton = styled.button`
  color: #2C2C2C;
  background: #F5F5F5;
  border: 1px solid #6E6E6E;
  font-size: 1.6em;
  padding: 4% 0;
  box-shadow: inset 3px 3px 10px -6px  #faf0f0bf ;
  @media (min-width:768px){
      width: 80%;
    }
`

type Props = {
  width: number;
};

interface IContextProps {
  state: { [key: string]: any };
  dispatch: Dispatch<any>;
}

export const FormContext = createContext({} as IContextProps);

const Filters = ({ width }: Props): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  const searchCntxt = useContext(SearchContext);

  const initialFormValues = searchCntxt.state.filters;

  const [state, dispatch] = useReducer(formReducer, initialFormValues);

  // const contextValue = useMemo(() => {
  //     return { state, dispatch };
  //   }, [state, dispatch]);

  // useEffect(() => {
  //     console.log(searchCntxt.state.filters['mealType'])
  // }, [])

  function updateFilters(event: any) {
    event.preventDefault();
    console.log(state);
    searchCntxt.dispatch({ type: "FILTERS", value: state });
  }

  return (
    <StyledFilters isActive={isActive} onClick={() => setIsActive(!isActive)}>
      {/* {width<768 && <StyledDropdownDiv>
            <StyledMobileTitleH2>Filters</StyledMobileTitleH2>
            <button>
            <StyledDropdownSVG xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></StyledDropdownSVG>
            </button>
        </StyledDropdownDiv>  
      } */}

      <FormContext.Provider value={{ state, dispatch }}>
        {/* clear all button */}
        {
            width>767 ? 
            <StyledDesktopTitleDiv>
                <StyledDesktopTitleH2>Filters</StyledDesktopTitleH2>
                <StyledClearButton>Clear All</StyledClearButton>
            </StyledDesktopTitleDiv>
            : 
            <StyledMobileTitleDiv> 
                <StyledClearButton>Clear All</StyledClearButton>
                <StyledCloseSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></StyledCloseSVG>
            </StyledMobileTitleDiv>
        }
        {optionsList.map((el) => {
          if (typeof el.filter == "string") {
            return (
              <CheckboxList
                checkedList={searchCntxt.state.filters[el.filter]}
                list={el.options}
                name={el.filter}
                key={el.filter}
              />
            );
          }
        })}
      </FormContext.Provider>
      <StyledApplyButton type="submit" onClick={updateFilters}>
        Apply Filters
      </StyledApplyButton>
    </StyledFilters>
  );
};

export default Filters;
