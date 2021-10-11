import React, { useEffect, useState } from "react";
import FeedSection from "./subcomponents/FeedSection";
import frenchCakes from "../../../data/frenchCakes.json";
import italianPizzas from "../../../data/italianPizzas.json";
import polishSoups from "../../../data/polishSoups.json";
import mediterraneanSalads from "../../../data/mediterraneanSalads.json";
import { IData } from "../../../types/types";
import styled from "styled-components";
import { getRecipesArrFromResponse } from "../../../functions/getRecipesArrFromResponse";
import getFetchedData from "../../../functions/getFetchedData";
import { Recipe } from "../../../types/types";

const FlexyDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15% 0 50% 0;

  & > * {
    margin-bottom: 40%;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  @media (min-width: 768px) {
    margin: 6% 0;
    & > * {
      margin-bottom: 10%;
    }
    & > *:last-child {
      margin-bottom: 0;
    }
  }
`;

type Props = {
  width: number;
};

const Feed = ({ width }: Props): JSX.Element => {
  const [feedUI, setFeedUI] = useState<{ title: string; recipes: Recipe[] }[]>(
    []
  );
  useEffect(() => {
    const getFeed = async () => {
      const saladUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=salad&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d&cuisineType=Mediterranean&dishType=Salad&time=1-300&imageSize=SMALL&field=uri&field=label&field=image&field=url&field=totalTime';
      const saladData = await getFetchedData(saladUrl);
      // const saladData = mediterraneanSalads;
      const recipesArrSalad = getRecipesArrFromResponse(saladData);

      const soupUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=polish&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d&cuisineType=Eastern%20Europe&dishType=Soup&time=1-300&imageSize=SMALL&field=uri&field=label&field=image&field=url&field=totalTime';
      const soupData = await getFetchedData(soupUrl);
      // const soupData = polishSoups;
      const recipesArrSoup = getRecipesArrFromResponse(soupData);

      const pizzaUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d&cuisineType=Italian&dishType=Main%20course&time=1-300&imageSize=SMALL&field=uri&field=label&field=image&field=url&field=totalTime';
      const pizzaData = await getFetchedData(pizzaUrl);
      // const pizzaData = italianPizzas;
      const recipesArrPizza = getRecipesArrFromResponse(pizzaData);

      const cakeUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=cake&app_id=5c0fb7a3&app_key=ed3ef53124d5aeca35f2143b29cb363d&cuisineType=French&dishType=Desserts&time=1-300&imageSize=SMALL&field=uri&field=label&field=image&field=url&field=totalTime';
      const cakeData = await getFetchedData(cakeUrl);
      // const cakeData = frenchCakes;
      const recipesArrCake = getRecipesArrFromResponse(cakeData);

      setFeedUI([
        {
          title: "Mediterranean Salads",
          recipes: recipesArrSalad,
        },
        {
          title: "Polish Soups",
          recipes: recipesArrSoup,
        },
        {
          title: "Italian Pizzas",
          recipes: recipesArrPizza,
        },
        {
          title: "French Cakes",
          recipes: recipesArrCake,
        },
      ]);
    };
    getFeed();
  }, []);

  return (
    <FlexyDiv>
      {feedUI ? (
        feedUI.map((feedEl) => {
          return (
            <FeedSection
              key={feedEl.title}
              width={width}
              title={feedEl.title}
              content={feedEl.recipes}
            />
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </FlexyDiv>
  );
};

export default Feed;
