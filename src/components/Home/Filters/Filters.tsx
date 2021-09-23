import React, {createContext, useState, Dispatch, useReducer, useContext, useMemo} from 'react'
import styled from 'styled-components'
import CheckboxList from './subcomponents/CheckboxList';
import optionsList from './lists/optionsList';
import { IForm } from '../../../types/types';
import {formReducer} from '../../../reducers/formReducer'
import { SearchContext } from '../../App';

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

type Props = {
    width: number;
}


interface IContextProps {
    state: IForm;
    dispatch: Dispatch<any>;
}
  
  export const FormContext = createContext({} as IContextProps);

const Filters = ({width}:Props): JSX.Element => {

    
    const [isActive, setIsActive] = useState(false);

    
    const initialFormValues = { 
        mealType: [],
        dishType: [],
        health: [],
        cuisineType: [],
        diet: [], };
    const [state, dispatch] = useReducer(formReducer, initialFormValues);

    // const contextValue = useMemo(() => {
    //     return { state, dispatch };
    //   }, [state, dispatch]);

    const searchCntxt = useContext(SearchContext);
    function logg(event: any) {
        event.preventDefault();
        // console.log(state);
        searchCntxt.dispatch({type: 'FILTERS', value: state})
    }

    return (
        <StyledFilters isActive={isActive} onClick={()=>setIsActive(!isActive)}>
            <h1>Filters</h1>
            <FormContext.Provider value={{state, dispatch}}>
            {optionsList.map(el=>{
                return (
                    <CheckboxList list={el.options} name={el.filter} key={el.filter}/>
                )
            })}
            </FormContext.Provider>
            <button type='submit' onClick={logg}>Apply Filters</button>
        </StyledFilters> 
    )
}

export default Filters
