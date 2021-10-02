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
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
  }
`

const StyledInput = styled.input`
  @media (min-width: 768px) {
    width: 80%;
  }
`

const StyledButton = styled.button`
  @media (min-width: 768px) {
    width: 20%;
  }
`

const Searchbar = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const { dispatch } = useContext(SearchContext);
  function lookForSearchValue() {
    dispatch({ type: "SEARCH", value: searchValue });
  }

  return (
    <StyledDiv>
      <StyledInput type="text"
        placeholder="keywords"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.code == "Enter") {
            lookForSearchValue();
          }
        }}
      ></StyledInput>
      <StyledButton onClick={lookForSearchValue}>Change value</StyledButton>
    </StyledDiv>
  );
};
export default Searchbar;
