import React, {useState} from 'react'
import styled from 'styled-components'
import CheckboxList from './subcomponents/CheckboxList';
import optionsList from './lists/optionsList';

const StyledFilters = styled('form')<{isActive: boolean}>`
    display: flex;
    flex-direction: column;
    height: fit-content;
    background: ${props => props.isActive ? "palevioletred" : "white"};
    @media (min-width: 768px) {
        
    border: 5px solid green;
        width: 20%;
    }
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
