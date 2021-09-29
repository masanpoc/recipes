import React, { useContext } from "react";
import { FormContext } from "../Filters";
import styled, {css} from "styled-components";

export const ItemCss = () => css`
 position: relative;
  width: max-content;
  background: #f5f5f5;
  box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.18);
  border-radius: 20px;
  padding: 3% 5%;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    padding: 0;
    background: none;
    box-shadow: none;
    border-radius: 0%;
  }
`

const StyledItem = styled.li`
  ${ItemCss()}
 
`;

export const InputCss = () => css`
  opacity: 0;
  position: absolute;
  @media (min-width: 768px) {
    opacity: 1;
    position: relative;
  }
`

const StyledInput = styled.input`
  ${InputCss()}
`;

export const LabelCss = () => css`
  /* border: 0.1px solid black; */
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 1.05em;
  /* position: absolute; */
  @media (min-width: 768px) {
    position: relative;
    background: none;
    box-shadow: none;
    padding: 0;
    font-size: 1em;
  }
`

const StyledLabel = styled('label')<{selected: boolean}>`
    ${LabelCss()}
    /* ${(props) =>
    props.selected &&
    `
        background: blue;
    `}; */
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

  function checkInput () {
    const el = document.getElementById(option) as HTMLInputElement;
    return el.checked
  }

  return (
    <StyledItem key={option}>
      <StyledInput
        type="checkbox"
        id={option}
        name={option}
        value={option}
        onChange={handleInputCheckbox}
      />
      <StyledLabel selected={checkInput()} htmlFor={option}>{option}</StyledLabel>
    </StyledItem>
  );
};

export default CheckboxElement;
