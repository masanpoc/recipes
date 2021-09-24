import React, {useContext, useState, useEffect} from 'react'
import { FormContext } from '../Filters';

type Props = {
  list:string[]; 
  name:string;
  checkedList: string[];
}

const CheckboxList = ({list, name, checkedList}: Props) :JSX.Element => {
    const [inputValues, setInputValues] = useState<string[]>([]);
    const [notClicked, setNotClicked] = useState<boolean>(true);

    const { dispatch } = useContext(FormContext);

    useEffect(() => {
      setInputValues(checkedList);
    }, [])

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
              if(checkedList.includes(option)){
                return <li
                  key={option}
                >
                  <input
                    type="checkbox"
                    id={option}
                    name={option}
                    value={option}
                    onChange={handleInputCheckbox}
                    onClick={()=>setNotClicked(!notClicked)}
                    checked={notClicked && true}
                  />
                  <label htmlFor={option} className="text-left w-full">
                    {option}
                  </label>
              </li>
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
