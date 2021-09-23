import React, {useState} from 'react'
import styled from 'styled-components'
import { Recipe } from '../../../../types/types'
import RecipeCard from '../../../RecipeCard/RecipeCard'
import { flexColumnBox } from '../../../../styles/mixins'


const StyledFeedSection = styled.div`
  ${flexColumnBox({})}
  border: 1px solid black;
  background: white;
`

const StyledList = styled.ul`
    --w: 90;
    --mb: 0.25;
    width: calc(var(--w)*1%);
    & > * {
            margin-bottom:  calc(var(--mb)*var(--w) * 1vw);
            /* margin-bottom: 25%; */
        }
        & > *:last-child {
            margin-bottom: 0;
        }
    @media (min-width: 768px){
        flex-direction: row;
        overflow-x: hidden;
        border: 5px solid black;
        height: fit-content;
        margin-bottom:  calc(var(--mb)/6*var(--w) * 1vw);
        & > * {
            margin-bottom: 0;
        }
    }
`

const StyledTitle = styled.h2`
    font-family: 'MerriWeather';
    border: 1px solid black;
    font-size: 2em;
    --w: 90;
    --mb: 0.10;
    width: calc(var(--w)*1%);
    margin: calc(var(--mb)*var(--w) * 1vw) 0;
    @media (min-width: 768px) {
        margin: calc(var(--mb)/5*var(--w) * 1vw) 0; 
    }
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
    margin: 17.5% 0 27.5% 0;
    @media (min-width: 768px) {
        display:none;
    }
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
