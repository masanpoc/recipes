import React, {createContext, useState, Dispatch, useReducer, useContext, useEffect} from 'react'
import styled from 'styled-components'
import CheckboxList from './subcomponents/CheckboxList';
import optionsList from './lists/optionsList';
// import { IForm } from '../../../types/types';
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
    state:  { [key: string]: any };
    dispatch: Dispatch<any>;
}
  
  export const FormContext = createContext({} as IContextProps);

const Filters = ({width}:Props): JSX.Element => {

    

    const [isActive, setIsActive] = useState(false);

    const searchCntxt = useContext(SearchContext);
    
    const initialFormValues = searchCntxt.state.filters;

    const [state, dispatch] = useReducer(formReducer, initialFormValues);

    // const contextValue = useMemo(() => {
    //     return { state, dispatch };
    //   }, [state, dispatch]);

    
    // useEffect(() => {
    //     console.log(searchCntxt.state.filters['mealType'])
    // }, [])
    
    function updateFilters(event: any) {
        event.preventDefault();
        console.log(state);
        searchCntxt.dispatch({type: 'FILTERS', value: state})
    }

    return (
        <StyledFilters isActive={isActive} onClick={()=>setIsActive(!isActive)}>
            <h1>Filters</h1>
            <FormContext.Provider value={{state, dispatch}}>
            {optionsList.map(el=>{
                if(typeof el.filter == 'string'){
                    return (
                        <CheckboxList 
                        checkedList={searchCntxt.state.filters[el.filter]} list={el.options} name={el.filter} key={el.filter}/>
                    )
                }
            })}
            </FormContext.Provider>
            <button type='submit' onClick={updateFilters}>Apply Filters</button>
        </StyledFilters> 
    )
}

export default Filters
