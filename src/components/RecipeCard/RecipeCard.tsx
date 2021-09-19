import React from 'react'

type Props = {
    image: string;
    title: string;
    time: number;
    source: string;
}

const RecipeCard = ({image, title, time, source}:Props):JSX.Element => {
    return (
        <li>
            <img src={image}></img>
            <h3>{title}</h3>
            <h4>{time}</h4>
            <a href={source} rel='noreferrer' target='_blank' >Go to Recipe</a>
        </li>
    )
}

export default RecipeCard
