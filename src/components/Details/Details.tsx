import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import { flexColumnBox, flexRowBox } from "../../styles/mixins";
import HorizontalBarChart, { emptyNutrients, Nutrients } from "./subcomponents/HorizontalBarChart";
import PieChartComponent, { emptyMacro, Macro } from "./subcomponents/PieChart";
import { nordicNutrientRecommendations } from "./data/nordicNutrientRecommendations";
import getFetchedData from "../../functions/getFetchedData";
import { getPieChartData } from "../../functions/getPieChartData";
import { getBarChartData } from "../../functions/getBarChartData";
import specificRecipe from '../../data/specificRecipe.json';

// the component takes the id from route params and fetches that recipe to render it
// to go back means to fetch results from specific query and page (again) --> go to home

const StyledWrapperBGDiv = styled.div`
  background: rgba(220,220,220,0.28);
  ${flexColumnBox({})};
  & > * {
    width: 100%;
    background: white;
  } 
`

const StyledMobileBackDiv = styled.div`
      border: 1px solid gray;
    height: 7vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const StyledBackLink = styled(Link)`
  margin-left: 5%;
  ${flexColumnBox({})};
`

const StyledSVG = styled.svg`
  width:22px;
  height:22px;
  transform: rotate(180deg);
`

const StyledWrapperDiv = styled.div`
  ${flexColumnBox({})};
  justify-content: flex-start;
  min-height: 100vh;
  margin-top: 20%;
  margin-bottom: 50%;
  
  box-shadow: inset 0px 0px 1px 1px rgb(0 0 0 / 50%);
  @media(min-width: 768px) {
    width: 60%;
    margin: 0;
  }
`

const StyledDiv = styled.div`
 
    padding: 7% 5% 8% 4.5%;
    @media(min-width: 768px) {
      padding: 5% 2.5% 6% 7.5%;
    width: 90%;
  }
`

const StyledTitleH2 = styled.h2`
    font-size: 1.4em;
    font-weight: lighter;
    @media(min-width: 768px) {
      font-size: 1.8em;
  }
`

const StyledSubtitleH3 = styled.h3`
    font-size: 1.3em;
    margin: 4% 0 4% 0;
    @media(min-width: 768px) {
      font-size: 1.8em;
    margin: 3% 0 3% 0;
  }
`

const StyledSourceH5 = styled.h5`
  font-size: 1.1em;
    font-weight: lighter;
    @media(min-width: 768px) {
      font-size: 1.4em;
    }
`

const StyledATag = styled.a`
    font-size: 0.8em;
    font-weight: lighter;
    
`

const PieWrapperDiv = styled.div`
  ${flexColumnBox({})};
  border-bottom: 1px solid grey;
  width: 100%;
  --chartHeight: 350;
  --chartPaddingY: 52.5;
  --total: calc(var(--chartHeight)+var(--chartPaddingY));
  height: calc(var(--total)*1px);
  @media(min-width: 768px){
    ${flexRowBox({})};
    --chartHeight: 350;
    --chartPaddingY: 52.5;
    --total: calc(var(--chartHeight)+var(--chartPaddingY));
    height: calc(var(--total)*1px);
    overflow: hidden;
  }
`

const TitleChartWrapperDiv = styled.div`
  position: relative;
  width: 100%;
  /* from container (see above variables) */
  height: 402.5px;
  @media(min-width: 768px){
    width: 50%;
    /* from container (see above variables) */
    height: 402.5px;
  }

`

const StyledH3 = styled.h3`
  position: absolute;
    left: 50%;
    top: 11%;
    transform: translateX(-50%);
    width: max-content;
`

const StyledGoBackLink = styled(Link)`
    display: flex;
    margin: 10% 0 20% 0;
    box-shadow: inset 0px 0px 1px 1px rgb(0 0 0 / 50%);
    border-radius: 5px;
    padding: 1% 1.5%;
    justify-content: space-evenly;
    align-items: center;
    text-decoration: none;
`

type Props = {
  match: {
    params: {
      id: string;
    };
  };
};


const Details = ({match}:Props): JSX.Element => {

  const [pieChartData, setPieChartData] = useState<Macro>(emptyMacro);
  const [barChartData, setBarChartData] = useState<Nutrients>(emptyNutrients);
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const getData = async () => {
      const data = await getFetchedData(`https://api.edamam.com/api/recipes/v2/${match.params.id}?type=public&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d`);
      // console.log(data, 'data returned');
      // const data =  specificRecipe; 
      const dataForPieChart = getPieChartData(data);
      // console.log(dataForPieChart);
      setPieChartData(dataForPieChart);
      const dataForBarChart = getBarChartData(data);
      setBarChartData(dataForBarChart);
      setTitle(data.recipe.label);
      setUrl(data.recipe.url);
    }
    getData();
  }, [])

  useEffect(() => {
    // console.log("rerendered");
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);

  return (
    <StyledWrapperBGDiv>
      {width<768 && 
          <StyledMobileBackDiv>
            <StyledBackLink to="/home">
            <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
            </StyledSVG>
            </StyledBackLink>

      </StyledMobileBackDiv>}
      
      <StyledWrapperDiv>
        <StyledDiv>

          <StyledTitleH2>Nutrition Analysis per serve of: </StyledTitleH2> 
          <StyledSubtitleH3> &#34;<b>{title}</b>&#34;</StyledSubtitleH3> 
          <StyledSourceH5><a href={url} target="_blank" rel="noreferrer">Source</a></StyledSourceH5>


        </StyledDiv>
        <HorizontalBarChart data={barChartData} screenWidth={width} />

        <PieWrapperDiv>

          <TitleChartWrapperDiv>
            <StyledH3>Energy Allocation REAL</StyledH3>
            <PieChartComponent data={pieChartData} width={width} border={true} />
          </TitleChartWrapperDiv>

          <TitleChartWrapperDiv>
            <StyledH3>Energy Allocation IDEAL</StyledH3>
            <PieChartComponent data={nordicNutrientRecommendations} width={width} border={false} />
          </TitleChartWrapperDiv>

        </PieWrapperDiv>

          {width>=768 && <StyledGoBackLink to="/home">
            <svg xmlns="http://www.w3.org/2000/svg" style={{height:'15px', width: '15px', marginRight: '10px'}} viewBox="0 0 24 24">
              <path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"/>
            </svg>
            <span style={{width: '60px'}}>Go Back</span>
            </StyledGoBackLink>
          }
          
      </StyledWrapperDiv>

    </StyledWrapperBGDiv>
  );
};

export default Details;
