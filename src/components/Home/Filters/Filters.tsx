import React, {
  createContext,
  useState,
  Dispatch,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import CheckboxList from "./subcomponents/CheckboxList";
import optionsList from "./lists/optionsList";
// import { IForm } from '../../../types/types';
import { formReducer } from "../../../reducers/formReducer";
import { SearchContext } from "../../App";
import ModalFilter from "./Modal/ModalFilter";
import { flexColumnBox } from "../../../styles/mixins";

const StyledFilters = styled.form`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background: white;
  @media (min-width: 768px) {
    /* border: 5px solid green; */
    margin-top: 2.5%;
    box-shadow: 0px 0px 1px 0px rgb(0 0 0 / 75%);
    width: 15%;
    padding: 2%;
    position: relative;
  }
`;

const StyledDropdownDiv = styled.div`
  display: flex;
  border: 1px solid gray;
  justify-content: flex-end;
  align-items: center;
  height: 6vh;
`;

const StyledDropdownSVG = styled.svg`
  height: 24px;
  width: 24px;
`;

const StyledClearButton = styled.button`
  @media(min-width:768px){
    width: fit-content;
    height: auto;
    background: white;
    border: 1px solid grey;
    cursor: pointer;
    height: max-content;
    font-size: 1em;
    padding: 1.5% 3%;
    border: none;
    box-shadow: 0 0 1px 0px black;
    border-radius: 6px;
  }
`;

const StyledDesktopTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;

`;

const StyledMobileTitleH2 = styled.h2`
  margin-right: 5%;
`;

const StyledHR = styled.hr`
    box-shadow: 0px 0px 0.6px 0.1px black;
    border: none;
    background: none;
    position: absolute;
    width: 100%;
    top: 7%;
    left: 0;
`

const StyledDropdownButton = styled.button`
  ${flexColumnBox({})}
  margin-right: 4%;
`;

const StyledDesktopTitleH2 = styled.h2`
  font-size: 1.8em;
  
`;

const StyledApplyButton = styled.button`
  
  @media (min-width: 768px) {
    color: #2c2c2c;
    font-size: 1em;
    padding: 4% 7%;
    width: 80%;
    border: none;
    border-radius: 6px;
    height: max-content;
    width: max-content;
    box-shadow: inset 3px 3px 10px -6px #faf0f0bf;
    background: #989898;
    color: white;
    margin-top: 10%;
    margin-bottom: 5%;
    cursor: pointer;
  }
`;

type Props = {
  width: number;
};

interface IContextProps {
  state: {
    filters: { [key: string]: any };
    isActive: boolean;
  };
  dispatch: Dispatch<any>;
}

export const FormContext = createContext({} as IContextProps);

const Filters = ({ width }: Props): JSX.Element => {
  const searchCntxt = useContext(SearchContext);

  const initialFormValues = {
    filters: searchCntxt.state.filters,
    isActive: false,
  };

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
    searchCntxt.dispatch({ type: "FILTERS", value: state.filters });
  }

  return (
    <StyledFilters>
      <FormContext.Provider value={{ state, dispatch }}>
        {width < 768 && (
          <StyledDropdownDiv>
            <StyledMobileTitleH2>Filters</StyledMobileTitleH2>
            <StyledDropdownButton
              type="button"
              onClick={() =>
                dispatch({
                  type: "UPDATE_DISPLAY",
                  value: {
                    input: "",
                    selected: [],
                    checked: false,
                    isActive: true,
                  },
                })
              }
            >
              <StyledDropdownSVG
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z" />
              </StyledDropdownSVG>
            </StyledDropdownButton>
          </StyledDropdownDiv>
        )}
        {/* clear all button */}
        {width > 767 && (
          <>
          <StyledDesktopTitleDiv>
            <StyledDesktopTitleH2>Filters</StyledDesktopTitleH2>
            <StyledClearButton
              type="button"
              onClick={() =>
                dispatch({
                  type: "CLEAR_FILTERS",
                  value: {
                    input: "",
                    selected: [],
                    checked: false,
                    isActive: false,
                  },
                })
              }
            >
              Clear All
            </StyledClearButton>
          </StyledDesktopTitleDiv>
          <StyledHR />
          </>
        )}
        
        {width > 767 &&
          optionsList.map((el, i) => {
            if (typeof el.filter == "string") {
              return (
                <CheckboxList
                  checkedList={searchCntxt.state.filters[el.filter]}
                  list={el.options}
                  name={el.filter}
                  key={el.filter}
                  index={i}
                />
              );
            }
          })}
        {width > 767 && (
          <StyledApplyButton type="submit" onClick={updateFilters}>
            Show Results
          </StyledApplyButton>
        )}
        {/* Typescript also has a non-null assertion that you can use when you are sure that the value is never null by adding the ! operator to the end of your statement: */}
        {width < 768 && <ModalFilter isActive={state.isActive} />}
      </FormContext.Provider>
    </StyledFilters>
  );
};

export default Filters;
