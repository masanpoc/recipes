
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
import CheckboxList from "../subcomponents/CheckboxList";
import optionsList from "../lists/optionsList";
import { formReducer } from "../../../../reducers/formReducer";
import { SearchContext } from "../../../App";
import { FormContext } from "../Filters";

const StyledCloseSVG = styled.svg`
    height: 15px;
    width: 15px;
    /* fill: #787878; */
`

const StyledClearButton = styled.button`
    width: fit-content;
    height: auto;
    background: white;
    color: #4B4B4B;
    border: 1px solid grey;
    
`

const StyledMobileTitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    height: max-content;
    width: 100%;
    height: 20%;
`

const StyledMobileModalDiv = styled.div`
  
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: scroll; */
  justify-content: center;
`

const StyledWrapperModal = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    position: absolute;
    height: 60vh;
    width: 100%;
    transform: translateY(50%);
`

const StyledMask = styled.div`
  overflow: scroll;
  height: 60%;
  width: 100%;
`

const StyledFilterFooterDiv = styled.div`
  background: yellow;
  display: flex;
  height: 20%;
  justify-content: flex-end;
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
    isActive: boolean;
}

  

const ModalFilter = ({isActive}: Props):JSX.Element => {
    const searchCntxt = useContext(SearchContext);
    const formCntxt = useContext(FormContext);
    function updateFilters(event: any) {
        event.preventDefault();
        console.log(formCntxt.state);
        searchCntxt.dispatch({ type: "FILTERS", value: formCntxt.state });
      }
      
    return (
        <>
            {isActive &&
createPortal(<StyledMobileModalDiv>

     <StyledWrapperModal>
      <StyledMobileTitleDiv> 
          <StyledClearButton>Clear All</StyledClearButton>
          <button type='button' onClick={ ()=>formCntxt.dispatch({type: "UPDATE_DISPLAY", value: {input: '', selected: [], checked: false, isActive: false}}) }>
            <StyledCloseSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></StyledCloseSVG>
          </button>
      </StyledMobileTitleDiv>
      <StyledMask>
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
      </StyledMask>
      
      <StyledFilterFooterDiv>
        <StyledApplyButton type="submit" onClick={updateFilters}>
          Show Results
        </StyledApplyButton>
      </StyledFilterFooterDiv>

  </StyledWrapperModal> 
</StyledMobileModalDiv>, document.getElementById('modal')!)
            }
        </>
    )
}

export default ModalFilter
