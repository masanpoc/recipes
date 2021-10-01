import React from "react";
import CheckboxElementPreSelectedOnRender from "./CheckboxElementPreSelectedOnRender";
import CheckboxElement from "./CheckboxElement";
import capitalizeFirstLetter from "../../../../functions/capitalizeFirstLetter";
import styled from "styled-components";

const StyledCheckBoxListDiv = styled('div')<{index:number}>`
  width: 85%;
  
  padding: 7% 0 3% 0;
  & > *:first-child {
    margin-bottom: 6%;
  }

  @media(min-width: 768px){
    ${(props) =>
    (props.index==0) ?
    `
        padding: 15% 0 3% 0;
    ` : `
      padding: 3% 0 3% 0;
    `};
  }
`;

const StyledTitleH3 = styled.h3`
  font-size: 1.15em;
`;

const StyledUl = styled.ul`
  flex-direction: row;
  flex-wrap: wrap;
  & > * {
    margin-right: 5%;
    margin-bottom: 4%;
  }
  & > *:last-child {
    margin-right: 0;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    & > * {
      margin-right: 0;
      margin-bottom: 2%;
    }
  }
`;

type Props = {
  list: string[];
  name: string;
  checkedList: string[];
  index?: number;
};

const CheckboxList = ({ list, name, checkedList, index }: Props): JSX.Element => {
  return (
    <StyledCheckBoxListDiv index={index!}>
      <StyledTitleH3>
        {capitalizeFirstLetter(name).replace(/([A-Z])/g, " $1")}
      </StyledTitleH3>
      <StyledUl>
        {list.map((option: string) => {
          if (checkedList.includes(option)) {
            return (
              <CheckboxElementPreSelectedOnRender
                key={option}
                option={option}
                name={name}
              />
            );
          }
          return <CheckboxElement key={option} option={option} name={name} />;
        })}
      </StyledUl>
    </StyledCheckBoxListDiv>
  );
};

export default CheckboxList;
