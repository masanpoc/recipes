import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";
import { flexColumnBox, flexRowBox } from "../../styles/mixins";
import BarChart, { emptyNutrients, Nutrients } from "./subcomponents/BarChart";
import PieChart, { emptyMacro, Macro } from "./subcomponents/PieChart";
import { nordicNutrientRecommendations } from "./data/nordicNutrientRecommendations";
import getFetchedData from "../../functions/getFetchedData";
import { getPieChartData } from "../../functions/getPieChartData";
import { getBarChartData } from "../../functions/getBarChartData";

// the component takes the id from route params and fetches that recipe to render it
// to go back means to fetch results from specific query and page (again) --> go to home

const StyledWrapperDiv = styled.div`
  ${flexColumnBox({})};
`

const StyledH2 = styled.h2`

`

const PieWrapperDiv = styled.div`
  ${flexRowBox({})}
`

const WrapperButtonsDiv = styled.div`
  ${flexRowBox({})};
`

const StyledButton = styled.button`

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

  useEffect(() => {
    const getData = async () => {
      const data = await getFetchedData(`https://api.edamam.com/api/recipes/v2/${match.params.id}?type=public&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d`);
      console.log(data, 'data returned');
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

  return (
    <StyledWrapperDiv>
      <StyledH2>Nutrition Analysis per serve of &#34;<i>{title}</i>&#34;:</StyledH2>
      <BarChart data={barChartData} />
      <PieWrapperDiv>
        <PieChart data={pieChartData} />
        <PieChart data={nordicNutrientRecommendations} />
      </PieWrapperDiv>
      <WrapperButtonsDiv>
        <StyledButton><Link to="/home">Go Back</Link></StyledButton>
        <StyledButton><a href={url} target="_blank" rel="noreferrer">Go To Recipe</a></StyledButton>
      </WrapperButtonsDiv>
    </StyledWrapperDiv>
  );
};

export default Details;
