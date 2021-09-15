import React, {useState} from 'react'
import styled from 'styled-components'
import CheckboxList from './subcomponents/CheckboxList';
import optionsList from './lists/optionsList';

const StyledFilters = styled('form')<{isActive: boolean}>`
    display: flex;
    flex-direction: column;
    background: ${props => props.isActive ? "palevioletred" : "white"};
`


const Filters = (): JSX.Element => {
    const [isActive, setIsActive] = useState(false);
    return (
        <StyledFilters isActive={isActive} onClick={()=>setIsActive(!isActive)}>
            <h1>Filters</h1>
            {optionsList.map(el=>{
                return (
                    <CheckboxList list={el.options} name={el.filter} key={el.filter}/>
                )
            })}
            <button>Apply Filters</button>
        </StyledFilters> 
    )
}

export default Filters
