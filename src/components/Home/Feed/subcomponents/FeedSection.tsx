import React, {useEffect} from 'react'
import styled from 'styled-components'
import { Recipe } from '../../../../types/types'


const FlexyDiv = styled.div`
  display: flex;
  flex-direction: column;
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
            <h2>title</h2>
            {content.map((recipe)=> {
                return (
                    <div key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <img src={recipe.image}></img>
                    <a href={recipe.source} rel='noreferrer' target='_blank' >Go to Recipe</a>
                    <h5>{recipe.time}</h5>
                    </div>
                )
            })}
        </FlexyDiv>
    )
}

export default FeedSection
