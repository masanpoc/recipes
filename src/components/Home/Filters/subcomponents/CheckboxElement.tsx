import React, {useContext} from 'react'
import {FormContext} from '../Filters'

const CheckboxElement = ({option, name}:{option:string, name:string}): JSX.Element => {

    const { dispatch } = useContext(FormContext);

    function handleInputCheckbox (e: { target: { type: string; checked: boolean; value: string; }; }) {
        if (e.target.type === 'checkbox' && e.target.checked) {
            dispatch({ type: "UPDATE_INPUT", value: {input: name, selected: option, checked: true} });
        } else {
            dispatch({ type: "UPDATE_INPUT", value: {input: name, selected: option, checked: false} });
        }
    }

    return (
        <li
            key={option}
        >
            <input
                type="checkbox"
                id={option}
                name={option}
                value={option}
                onChange={handleInputCheckbox}
            />
            <label htmlFor={option}>
                {option}
            </label>
        </li>
    )
}

export default CheckboxElement
