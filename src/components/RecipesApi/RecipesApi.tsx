import React, {FC, useContext} from 'react';
import { SearchContext } from '../App';

const RecipesApi: FC = () => {
    const {state} = useContext(SearchContext);
    return (
        <div>
            {state.inputValue}
        </div>
    )
}

export default RecipesApi
