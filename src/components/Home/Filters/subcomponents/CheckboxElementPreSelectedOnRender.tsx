import React, { useState, useContext } from "react";
import { FormContext } from "../Filters";
import styled from "styled-components";
import { ItemCss, InputCss, LabelCss } from "../../../../styles/mixins";
import capitalizeFirstLetter from "../../../../functions/capitalizeFirstLetter";

const StyledItem = styled.li`
  ${ItemCss()}
  background: #989898;
  color: white;
  @media (min-width: 768px) {
    color: black;
    background: none;
  }
`;

const StyledInput = styled.input`
  ${InputCss()}
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
  const [notClicked, setNotClicked] = useState<boolean>(true);

  const { dispatch } = useContext(FormContext);

  function handleInputCheckbox(e: {
    target: { type: string; checked: boolean; value: string };
  }) {
    // console.log(e.target.type, e.target.checked)

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
        checked={true}
      />
      <StyledLabel htmlFor={option}>{capitalizeFirstLetter(option)}</StyledLabel>
    </StyledItem>
  );
};

export default CheckboxElement;
