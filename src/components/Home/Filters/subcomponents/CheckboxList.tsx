import React, {useContext, useState, useEffect} from 'react'
import { FormContext } from '../Filters';

const CheckboxList = ({list, name}: {list:string[], name:string}) :JSX.Element => {
    const [inputValues, setInputValues] = useState<string[]>([]);

    const { dispatch } = useContext(FormContext);

    useEffect(() => {
      dispatch({ type: "UPDATE_INPUT", value: {input: name, selected: inputValues} });
    }, [inputValues])

    function handleInputCheckbox (e: { target: { type: string; checked: boolean; value: string; }; }) {
      if (e.target.type === 'checkbox' && e.target.checked) {
        setInputValues([...inputValues, e.target.value]);
      } else {
          const newState = inputValues.filter((str)=>str!=e.target.value);
          setInputValues(newState);
      }
    }

    return (
    <div>
        <h3>{name}</h3>
        <ul>
          {list.map((option:string) => {
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
                  <label htmlFor={option} className="text-left w-full">
                    {option}
                  </label>
                </li>
              );
            })}
        </ul>
      </div>
    )
}

export default CheckboxList
