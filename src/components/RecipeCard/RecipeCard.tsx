import React from 'react'
import styled from 'styled-components'
import {alignTwoStart} from '../../styles/mixins'

type Props = {
    image: string;
    title: string;
    time: number;
    source: string;
}

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid gray;
    box-shadow: 1px 1px 2px 0 gray;
    *  {
        font-family: 'Odibee Sans'
    }
`

const SpaceBetweenDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const LimitWidthDiv = styled.div`
    width: 80%;
`

const TwoElsStyledDiv = styled.div`
    ${alignTwoStart('2px')}
`

const RecipeCard = ({image, title, time, source}:Props):JSX.Element => {
    return (
        <StyledCard>
            <img src={image}></img>
            <LimitWidthDiv>
                <h3>{title}</h3>
                <TwoElsStyledDiv>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{'width': '24px', 'height': '24px'}} viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>
                    
                <h4>{time} min</h4>
                </TwoElsStyledDiv>
                <SpaceBetweenDiv>
                    <a href="">Nutrition Analysis</a>
                    <a href={source} rel='noreferrer' target='_blank' >Go to Recipe</a>
                </SpaceBetweenDiv>
            </LimitWidthDiv>
        
        </StyledCard>
    )
}

export default RecipeCard
