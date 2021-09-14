import React from 'react'

const CheckboxList = ({list, name}: {list:string[], name:string}) :JSX.Element => {
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
                    // onChange={handleStrokes}
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
