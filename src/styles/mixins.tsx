import { css } from "styled-components";

type flexColProps = {
  height?: string;
  width?: string;
};

export const flexColumnBox = ({ height, width }: flexColProps) => css`
  display: flex;
  height: ${height};
  width: ${width};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const flexRowBox = ({ height, width }: flexColProps) => css`
  display: flex;
  height: ${height};
  width: ${width};
  justify-content: center;
  align-items: center;
`;

type alignStartProps = {
  gap?: string;
};

export const alignTwoStart = ({ gap }: alignStartProps) => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & *:first-child {
    margin-right: ${gap};
  }
`;


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


export const InputCss = () => css`
  opacity: 0;
  position: absolute;
  @media (min-width: 768px) {
    opacity: 1;
    position: relative;
  }
`


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