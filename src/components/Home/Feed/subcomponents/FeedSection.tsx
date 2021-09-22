import React, {useState} from 'react'
import styled from 'styled-components'
import { Recipe } from '../../../../types/types'
import RecipeCard from '../../../RecipeCard/RecipeCard'
import { flexColumnBox } from '../../../../styles/mixins'


const StyledFeedSection = styled.div`
  ${flexColumnBox({})}
  border: 1px solid black;
  background: white;
  margin-top: 10%;
`

const StyledList = styled.ul`
    width: 90%;
    @media (min-width: 768px){
        flex-direction: row;
    }
`

const StyledTitle = styled.h2`
    font-family: 'MerriWeather';
    border: 1px solid black;
    width: 90%;
`

const StyledButton = styled('button')<{isActive:boolean}>`
    ${props=> props.isActive && `
        display: none
    `};
    font-family: 'Merriweather';
    font-weight: lighter;
    color: #787878;
    background: white;
    border: 1px solid #787878;
    padding: 10px 15px;
`

type Props = {
    title: string;
    content: Recipe[]
}

const FeedSection = ({title, content}:Props):JSX.Element => {
    const [loadMore, setLoadMore] = useState<boolean>(false);
    return (
        <StyledFeedSection>
            <StyledTitle>{title}</StyledTitle>
            <StyledList>
            {loadMore 
                ? 
                content.map((recipe)=> {
                    return (
                        <RecipeCard key={recipe.id} title={recipe.title} image={recipe.image} source={recipe.source} time={recipe.time} />
                    )
                })
                :
                content.slice(0, 3).map((recipe)=> {
                    return (
                        <RecipeCard key={recipe.id} title={recipe.title} image={recipe.image} source={recipe.source} time={recipe.time} />
                    )
                })
            }
            </StyledList>
            <StyledButton isActive={loadMore} onClick={()=>setLoadMore(true)}>LOAD MORE</StyledButton>
        </StyledFeedSection>
    )
}

export default FeedSection
