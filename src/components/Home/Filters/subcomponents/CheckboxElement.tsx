import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../Filters";
import styled, {css} from "styled-components";
import { ItemCss, InputCss, LabelCss } from "../../../../styles/mixins";

const StyledItem = styled.li`

  ${ItemCss()}
   
`;

const StyledInput = styled.input`
  ${InputCss()}
  &:checked {
    background: blue;
  }
`;


const StyledLabel = styled.label`
    ${LabelCss()}
    
`;

const CheckboxElement = ({
  option,
  name,
}: {
  option: string;
  name: string;
}): JSX.Element => {
  const { dispatch } = useContext(FormContext);

  function handleInputCheckbox(e: {
    target: { type: string; checked: boolean; value: string };
  }) {
    // console.log(e.target.type, e.target.checked)
    if (e.target.type === "checkbox" && e.target.checked) {
      dispatch({
        type: "UPDATE_INPUT",
        value: { input: name, selected: option, checked: true, isActive: true },
      });
    } else {
      dispatch({
        type: "UPDATE_INPUT",
        value: { input: name, selected: option, checked: false, isActive: true },
      });
    }
  }

  return (
    <StyledItem key={option} >
      <StyledInput
        type="checkbox"
        id={option}
        name={option}
        value={option}
        onChange={handleInputCheckbox}
      />
      <StyledLabel  htmlFor={option}>{option}</StyledLabel>
    </StyledItem>
  );
};

export default CheckboxElement;
