import React, {useState} from "react";
import styled from "styled-components";
import { alignTwoStart, CardStyle } from "../../styles/mixins";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const StyledCard = styled.div`
  ${CardStyle()}
`;


const StyledImg = styled.img`
  width: 100%;
  height: auto;
`;

const StyledLinksDiv = styled.div`
  display: flex;
  justify-content: space-between;
  & > * {
    font-size: 1.5em;
  }
`;

const Wrapper = styled.div`
  --w: 85;
  --my: 0.1;
  --child-mb: 0.075;
  width: calc(var(--w) * 1%);
  margin: calc(var(--my) * var(--w) * 1vw) 0;
  & > * {
    margin-bottom: calc(var(--child-mb) * var(--w) * 1vw);
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    margin: calc(var(--my) / 5 * var(--w) * 1vw) 0 0 0;
    & > * {
      margin-bottom: calc(var(--my) / 8 * var(--w) * 1vw);
    }
    & > *:last-child {
      margin-bottom: 0;
    }
  }
  /* border: 1px solid black; */
`;

const StyledTimeDiv = styled.div`
  ${alignTwoStart({ gap: "10px" })}
  & > *:first-child {
    width: 10%;
    height: auto;
  }
  & > *:last-child {
    font-size: 1.3em;
  }
`;

const StyledTitle = styled('h3')<{length: number}>`
  /* font-size: 2em; */
  ${(props)=>
    props.length > 59 ? `
      font-size: 1.7em
    ` : `
      font-size: 2em
    `
  }
`;



type Props = {
  image: string;
  title: string;
  time: number;
  source: string;
  id: string;
};


const RecipeCard = ({ image, title, time, source, id }: Props): JSX.Element => {

  return (
     <StyledCard>
      <StyledImg src={image}></StyledImg>
      <Wrapper>
        <StyledTitle length={title.length}>{title}</StyledTitle>
        <StyledTimeDiv>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z" />
          </svg>

          <h4>{time} min</h4>
        </StyledTimeDiv>
        <StyledLinksDiv>
          <Link to={`/recipes/${id.split('#')[1]}`} >Nutrition Analysis</Link>
          {/* <a href="">Nutrition Analysis</a> */}
          <a href={source} rel="noreferrer" target="_blank">
            Go to Recipe
          </a>
        </StyledLinksDiv>
      </Wrapper>
    </StyledCard>
      
      
  );
};

export default RecipeCard;
