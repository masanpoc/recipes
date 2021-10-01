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
    align-items: flex-start;
    padding: 0;
    background: none;
    box-shadow: none;
    border-radius: 0%;
  }
`;

export const InputCss = () => css`
  opacity: 0;
  position: absolute;
  @media (min-width: 768px) {
    opacity: 1;
    position: relative;
    &:checked {
      filter: grayscale() saturate(0%) brightness(70%) contrast(1000%);
    
    }
  }
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
`;

export const CardStyle = ()=>css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  box-shadow: 1px 1px 2px 0 gray;
  * {
    font-family: "Odibee Sans";
  }
  @media (min-width: 768px) {
    width: 17.5vw;
    height: 69.5vh;
    overflow: hidden;
  }
`;

export const UnorderedFeedList = () => css`
  --w: 90;
  --mb: 0.25;
  --mbEnd: 0.5;
  width: calc(var(--w) * 1%);
  & > * {
    margin-bottom: calc(var(--mb) * var(--w) * 1vw);
    /* margin-bottom: 25%; */
  }
  & > *:last-child {
    margin-bottom: calc(var(--mbEnd) * var(--w) * 1vw);
  }
  @media (min-width: 768px) {
    margin: 0 1vw;
    --w: 19.5;
    width: calc((var(--w)*20+1*2) * 1vw);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    /* border: 5px solid black; */
    height: fit-content;
    /* margin-bottom:  calc(var(--mb)/6*var(--w) * 1vw); */
    & > * {
      /* position: absolute; */
      background: white;
      margin-bottom: 0;
      margin-right: 2vw;
    }
  }
`