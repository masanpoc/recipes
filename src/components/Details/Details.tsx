import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import { flexColumnBox, flexRowBox } from "../../styles/mixins";
import BarChart, { emptyNutrients, Nutrients } from "./subcomponents/BarChart";
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
`

const StyledDiv = styled.div`
 
    padding: 7% 5% 8% 4.5%;
`

const StyledTitleH2 = styled.h2`
    font-size: 1.4em;
    font-weight: lighter;
`

const StyledSubtitleH3 = styled.h3`
    font-size: 1.3em;
    margin: 4% 0 4% 0;
`

const StyledSourceH5 = styled.h5`
  font-size: 1.1em;
    font-weight: lighter;
`

const StyledATag = styled.a`
    font-size: 0.8em;
    font-weight: lighter;
`

const PieWrapperDiv = styled.div`
  ${flexColumnBox({})};
  @media(min-width: 768px){
    ${flexRowBox({})}
  }
`

const TitleChartWrapperDiv = styled.div`
  position: relative;
`

const StyledH3 = styled.h3`
  position: absolute;
    left: 50%;
    top: 11%;
    transform: translateX(-50%);
    width: max-content;
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
      // const data = await getFetchedData(`https://api.edamam.com/api/recipes/v2/${match.params.id}?type=public&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d`);
      // console.log(data, 'data returned');
      const data =  specificRecipe; 
      const dataForPieChart = getPieChartData(data);
      console.log(dataForPieChart);
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
          <StyledSubtitleH3> &#34;<i>{title}</i>&#34;</StyledSubtitleH3> 
          <StyledSourceH5><a href={url} target="_blank" rel="noreferrer">Source</a></StyledSourceH5>


        </StyledDiv>
        <BarChart data={barChartData} />

        <PieWrapperDiv>

          <TitleChartWrapperDiv>
            <StyledH3>Energy Allocation REAL</StyledH3>
            <PieChartComponent data={pieChartData} box={true}/>
          </TitleChartWrapperDiv>

          <TitleChartWrapperDiv>
            <StyledH3>Energy Allocation IDEAL</StyledH3>
            <PieChartComponent data={nordicNutrientRecommendations} />
          </TitleChartWrapperDiv>

        </PieWrapperDiv>

          {width>=768 && <Link to="/home">Go Back</Link>}
          
      </StyledWrapperDiv>
    </StyledWrapperBGDiv>
  );
};

export default Details;
