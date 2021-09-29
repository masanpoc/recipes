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
    border: 5px solid green;
    width: 20%;
    padding: 2%;
  }
`;

const StyledDropdownDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 6vh;
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


const StyledDesktopTitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledMobileTitleH2 = styled.h2`
  margin-right: 5%;
`

const StyledDropdownButton = styled.button`
  ${flexColumnBox({})}
  margin-right: 4%;
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
  state: { 
    filters: {[key: string]: any}
    isActive: boolean;
  };
  dispatch: Dispatch<any>;
}

export const FormContext = createContext({} as IContextProps);

const Filters = ({ width }: Props): JSX.Element => {

  const searchCntxt = useContext(SearchContext);

  const initialFormValues = {filters: searchCntxt.state.filters, isActive: false};

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
      {width<768 && <StyledDropdownDiv>
            <StyledMobileTitleH2>Filters</StyledMobileTitleH2>
            <StyledDropdownButton type='button' onClick={ ()=>dispatch({type: "UPDATE_DISPLAY", value: {input: '', selected: [], checked: false, isActive: true}})}>
              <StyledDropdownSVG xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></StyledDropdownSVG>
            </StyledDropdownButton>
        </StyledDropdownDiv>  
      }
        {/* clear all button */}
        {
            width>767 &&
            <StyledDesktopTitleDiv>
                <StyledDesktopTitleH2>Filters</StyledDesktopTitleH2>
                <StyledClearButton type='button' onClick={ ()=>dispatch({type: "CLEAR_FILTERS", value: {input: '', selected: [], checked: false, isActive: false}})}>Clear All</StyledClearButton>
            </StyledDesktopTitleDiv>
            
        }

        {width > 767  && optionsList.map((el) => {
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
        {width>767 && 
      <StyledApplyButton type="submit" onClick={updateFilters}>
        Show Results
      </StyledApplyButton>}
      {/* Typescript also has a non-null assertion that you can use when you are sure that the value is never null by adding the ! operator to the end of your statement: */}
      {
        width<768 &&  <ModalFilter isActive={state.isActive} />
      }
      </FormContext.Provider> 
    </StyledFilters>
  );
};

export default Filters;
