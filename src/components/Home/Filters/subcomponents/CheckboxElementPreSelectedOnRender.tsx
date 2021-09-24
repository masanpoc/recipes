import React, { useState, useContext } from "react";
import { FormContext } from "../Filters";
import styled from "styled-components";


const StyledItem = styled.li`
  position: relative;
  width: max-content;
  background: #F5F5F5;
  box-shadow: 3px 3px 10px -6px  rgba(0,0,0,0.75) ;
  border-radius: 20px;
  padding: 3% 5%;
  @media (min-width:768px){
    display: flex;
        flex-direction: row;
        padding: 0;
        background: none;
        box-shadow: none;
        border-radius: 0%;
  }
`

const StyledInput = styled.input`
    opacity: 0;
    position: absolute;
    @media (min-width:768px){
        opacity: 1;
        position: relative;
    }
`

const StyledLabel = styled.label`
  /* border: 0.1px solid black; */
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  font-size: 1.2em;
  /* position: absolute; */
  @media(min-width: 768px){
    position: relative;
    background: none;
    box-shadow: none;
    padding: 0;
    font-size: 1em;
  }
`


const CheckboxElement = ({
  option,
  name,
}: {
  option: string;
  name: string;
}): JSX.Element => {
  const [notClicked, setNotClicked] = useState<boolean>(true);

  const { dispatch } = useContext(FormContext);

  function handleInputCheckbox(e: {
    target: { type: string; checked: boolean; value: string };
  }) {
    if (e.target.type === "checkbox" && e.target.checked) {
      dispatch({
        type: "UPDATE_INPUT",
        value: { input: name, selected: option, checked: true },
      });
    } else {
      dispatch({
        type: "UPDATE_INPUT",
        value: { input: name, selected: option, checked: false },
      });
    }
  }
  return (
    <StyledItem key={option}>
      <StyledInput
        type="checkbox"
        id={option}
        name={option}
        value={option}
        onChange={handleInputCheckbox}
        onClick={() => setNotClicked(!notClicked)}
        checked={notClicked && true}
      />
      <StyledLabel htmlFor={option}>{option}</StyledLabel>
    </StyledItem>
  );
};

export default CheckboxElement;
