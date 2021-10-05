import React, { useContext, useState } from "react";
import { SearchContext } from "../../App";
import styled from "styled-components";

// interface InputData {
//     title: string;
//     time: number;
//     ingredients: string[]
// }
// FC<InputData>

const StyledDiv = styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15%;
    height: 8vh;
  @media (min-width: 768px) {
    display: flex;
    width: 60%;
    margin: 2% 0px 0 0;
    height: 6vh;
  }
`

const StyledInput = styled.input`
    height: 8vh;
    font-size: 1.5em;
    text-align: right;
    padding-right: 3%;
    width: 70vw;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
    border: none;
    box-shadow: 0 0 0 1px grey;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  &:focus {
    outline: none;
  }
  &:focus::placeholder{
    color: transparent;
  }
  @media (min-width: 768px) {
    width: 90%;
    border-radius: 0%;
    height: 6vh;
  }
`

const StyledButton = styled.button`
  background: #e0e0e0;
  height: 8vh;
    width: 13vw;
    box-shadow: 0px 0px 0px 1px grey;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  @media (min-width: 768px) {
    width: 10%;
    border-radius: 0%;
    height: 6vh;
  }
`

const StyledSVG = styled.svg`

  height: 50%;
    fill: black;
    width: 50%;
`

const Searchbar = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const { dispatch } = useContext(SearchContext);
  function lookForSearchValue() {
    dispatch({ type: "SEARCH", value: searchValue });
    // clear input
    const input:any = document.getElementById('searchInput');
    input.value='';
    // clear filters by clicking clearAll desktop button (any clear all works fine)
    const clearButton: any = document.getElementById('clearButton');
    clearButton.click();
  }

  return (
    <StyledDiv>
      <StyledInput id='searchInput' type="text"
        placeholder="keywords"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            lookForSearchValue();
            e.currentTarget.blur();
          }
        }}
      ></StyledInput>
      <StyledButton onClick={lookForSearchValue}>
        <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/>
          </StyledSVG>
      </StyledButton>
    </StyledDiv>
  );
};
export default Searchbar;
