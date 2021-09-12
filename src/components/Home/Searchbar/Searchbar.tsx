import React, {FC, useContext, useState, } from 'react'
import { SearchContext } from '../../App';


// interface InputData {
//     title: string;
//     time: number;
//     ingredients: string[]
// }
// FC<InputData>

const Searchbar = (): JSX.Element => {

    const [searchValue, setSearchValue] = useState('')
    const {dispatch} = useContext(SearchContext);
    function lookForSearchValue() {
        dispatch({type: 'update searchValue', value: 'new value'})
    }

    return (
        <div>
            <input type='text' placeholder='keywords' onChange={(e)=>setSearchValue(e.target.value)}></input>
            <button onClick={lookForSearchValue}>Change value</button>
        </div>
    )
}

export default Searchbar
