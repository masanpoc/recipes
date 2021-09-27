import React from "react";
import CheckboxElementPreSelectedOnRender from "./CheckboxElementPreSelectedOnRender";
import CheckboxElement from "./CheckboxElement";
import capitalizeFirstLetter from "../../../../functions/capitalizeFirstLetter";
import styled from "styled-components";

const StyledUl = styled.ul`
  flex-direction: row;
  flex-wrap: wrap;
  & > * {
    margin-right: 5%;
    /* margin-bottom: 25%; */
  }
  & > *:last-child {
    margin-right: 0;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    & > * {
      margin-right: 0;
    }
  }
`;

type Props = {
  list: string[];
  name: string;
  checkedList: string[];
};

const CheckboxList = ({ list, name, checkedList }: Props): JSX.Element => {
  return (
    <div>
      <h3>{capitalizeFirstLetter(name).replace(/([A-Z])/g, " $1")}</h3>
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
    </div>
  );
};

export default CheckboxList;
