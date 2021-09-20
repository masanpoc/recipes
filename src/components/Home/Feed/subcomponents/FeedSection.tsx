import React, {useEffect} from 'react'
import styled from 'styled-components'
import { Recipe } from '../../../../types/types'
import RecipeCard from '../../../RecipeCard/RecipeCard'


const FlexyDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const List = styled.ul`
    flex-direction: row;
`

const StyledTitle = styled.h2`
    font-family: 'MerriWeather';
`

type Props = {
    title: string;
    content: Recipe[]
}

const FeedSection = ({title, content}:Props):JSX.Element => {
    // useEffect(() => {
    //     console.log(title, content, 'title and content')
    // }, [])
    return (
        <FlexyDiv>
            <StyledTitle>{title}</StyledTitle>
            <List>
            {content.map((recipe)=> {
                return (
                    <RecipeCard key={recipe.id} title={recipe.title} image={recipe.image} source={recipe.source} time={recipe.time} />
                )
            })}
            </List>
        </FlexyDiv>
    )
}

export default FeedSection
