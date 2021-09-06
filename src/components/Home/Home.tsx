import React from 'react'
import Searchbar from './Searchbar/Searchbar'
import RecipesApi from './RecipesApi/RecipesApi'


const Home = (): JSX.Element  => {

    return (
        <div>
            <Searchbar />
            <RecipesApi />
        </div>
    )
}

export default Home
