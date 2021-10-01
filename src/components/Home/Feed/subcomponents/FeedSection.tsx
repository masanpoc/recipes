import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {motion} from 'framer-motion';
import { Recipe } from "../../../../types/types";
import RecipeCard from "../../../RecipeCard/RecipeCard";
import { flexColumnBox, UnorderedFeedList } from "../../../../styles/mixins";


const StyledFeedSection = styled.div`
  ${flexColumnBox({})}
  /* border: 1px solid black; */
  background: white;
  box-shadow: inset 0px 0px 1px 1px rgb(0 0 0 / 50%);
`;

const StyledList = styled.ul`
  ${UnorderedFeedList()};
  
`;

const StyledMotionList =styled(motion.div)`
  ${UnorderedFeedList()}
`

const StyledTitle = styled.h2`
  font-family: "MerriWeather";
  /* border: 1px solid black; */
  font-size: 2em;
  --w: 90;
  --mb: 0.1;
  width: calc(var(--w) * 1%);
  margin: calc(var(--mb) * var(--w) * 1vw) 0;
  @media (min-width: 768px) {
    margin: calc(var(--mb) / 5 * var(--w) * 1vw) 0;
  }
`;

const StyledButton = styled("button")<{ isActive: boolean }>`
  ${(props) =>
    props.isActive &&
    `
        display: none
    `};
  font-family: "Merriweather";
  font-weight: lighter;
  color: #787878;
  background: white;
  border: 1px solid #787878;
  padding: 10px 15px;
  margin: -20% 0 27.5% 0;
`;

const StyledWrapperDiv = styled(motion.div)`
  /* border: 8px solid green; */
  position: relative;
  --w: 90;
  --mb: 0.25;
  width: calc(var(--w) * 1%);
  height: 70vh;
  overflow: hidden;

  margin-bottom: calc(var(--mb) / 6 * var(--w) * 1vw);
`;
const StyledPreviousButton = styled.button`
  ${flexColumnBox({})}
  position: absolute;
  cursor: pointer;
  top: 50%;
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid grey;
  border-radius: 50%;
  transform: translate(0, -100%);
  z-index: 2;
`;

const StyledNextButton = styled(StyledPreviousButton)`
  right: 0;
`;

const StyledSVG = styled.svg`
  height: 25px;
  width: 25px;
`;


const containerVariants = {
  
  target: (countFlow:number):any => {
    if(countFlow<0 || countFlow>0){
      // we change the x sign because we are moving the slider to that side
      return {
        x:-58.5*countFlow+'vw'
      }
    } 
    if(countFlow==0) {
      return {
        x:0
      }
    }
  },
}

type Props = {
  title: string;
  content: Recipe[];
  width: number;
};

const FeedSection = ({ title, content, width }: Props): JSX.Element => {
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  // useEffect(() => {
  //   console.log(count)
  // }, [count])

  function handlePrevious() {
    // we are defining count as 5.667 when reaching the limit of the list because we have slides of 3 els and at the end we dont want to leave a gap so we move the slide only 2 els instead of for each 3
    if(count>0 && count!=5.667){
      setCount(count-1)
    }
    if(count==5.667){
      setCount(5);
    }
  }

  function handleNext(){
    if(count<5){
      setCount(count+1)
    }
    if(count==5){
      setCount(5.667)
    }
  }

  return (
    <StyledFeedSection>
      <StyledTitle>{title}</StyledTitle>
      {width < 768 ? (
        <StyledList>
          {loadMore
            ? content.map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    source={recipe.source}
                    time={recipe.time}
                  />
                );
              })
            : content.slice(0, 3).map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    source={recipe.source}
                    time={recipe.time}
                  />
                );
              })}
        </StyledList>
      ) : (
        <StyledWrapperDiv
          initial={{ '--opacity': 0.2 } as any}
          whileHover={{ '--opacity': 1 } as any}
          // transition={{ duration: 2, type: 'tween' }}
        >
          <StyledPreviousButton style={{opacity: 'var(--opacity)', transition: 'opacity 0.5s'}} onClick={handlePrevious}>
            <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            </StyledSVG>
          </StyledPreviousButton>
          
          <StyledMotionList as={motion.div} 
            variants={containerVariants}
            initial={false}
            custom={count}
            animate="target"
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: 0.5
            }}
            >
              {content.map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    source={recipe.source}
                    time={recipe.time}
                  />
                );
              })}
            
            
          </StyledMotionList>
          <StyledNextButton style={{opacity: 'var(--opacity)', transition: 'opacity 0.5s'}} onClick={handleNext}>
              <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
              </StyledSVG>
            </StyledNextButton>
        </StyledWrapperDiv>
      )}

      {width < 768 && (
        <StyledButton isActive={loadMore} onClick={() => setLoadMore(true)}>
          LOAD MORE
        </StyledButton>
      )}
    </StyledFeedSection>
  );
};

export default FeedSection;
