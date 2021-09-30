import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {motion, AnimatePresence} from 'framer-motion';
import { Recipe } from "../../../../types/types";
import RecipeCard from "../../../RecipeCard/RecipeCard";
import { flexColumnBox, UnorderedFeedList } from "../../../../styles/mixins";


const StyledFeedSection = styled.div`
  ${flexColumnBox({})}
  border: 1px solid black;
  background: white;
`;

const StyledList = styled.ul`
  ${UnorderedFeedList()}

`;

const StyledMotionList =styled(motion.div)`
  ${UnorderedFeedList()}
`

const StyledTitle = styled.h2`
  font-family: "MerriWeather";
  border: 1px solid black;
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
  margin: 17.5% 0 27.5% 0;
`;

const StyledWrapperDiv = styled.div`
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
  top: 50%;
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid grey;
  border-radius: 50%;
  transform: translate(0, -50%);
`;

const StyledNextButton = styled(StyledPreviousButton)`
  right: 0;
`;

const StyledSVG = styled.svg`
  height: 25px;
  width: 25px;
`;


const containerVariants = {
  entered: (flowDirection:number) => {
    if(flowDirection>0){
      return {
        opacity: 0,
        x:100
      }
    } else {
      return {
        opacity: 0,
        x:100
      }
    }
  },
  target: {
    opacity: 1,
    x:0
  },
  exit: (flowDirection:number) => {
    if(flowDirection>0){
      console.log('moving left')
      return {
        opacity: 0,
        x:-100
      }
    } else {
      console.log('moving right')
      return {
        opacity: 0,
        x:100
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
  const [flow, setFlow] = useState<number>(0);

  useEffect(() => {
    if(flow>0){
      if(count<15){
        setCount(count+3);
      }
      if(count==15){
        setCount(count+2)
      }
    }
    if(flow<0) {
      if(count>0){
        setCount(count-3);
      }
      if(count==17){
        setCount(count-2);
      }
    }

  }, [flow])

  function handlePrevious() {
    if(flow>0){
      setFlow(-1)
    } else {
      setFlow(flow-1)
    }
  }

  function handleNext(){
    if(flow<0){
      setFlow(1)
    } else {
      setFlow(flow+1)
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
        <StyledWrapperDiv>
          <StyledPreviousButton onClick={handlePrevious}>
            <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            </StyledSVG>
          </StyledPreviousButton>
          
          <AnimatePresence>
          <StyledMotionList key={count} as={motion.div} 
            variants={containerVariants}
            initial="entered"
            custom={flow}
            animate="target"
            exit="exit"
            transition={{
              type: 'easeIn',
              duration: 0.5
            }}>
              {content.slice(count,count+3).map((recipe) => {
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
          </AnimatePresence>
          <StyledNextButton onClick={handleNext}>
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
