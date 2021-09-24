import React from 'react'
import CheckboxElementPreSelectedOnRender from './CheckboxElementPreSelectedOnRender'
import CheckboxElement from './CheckboxElement'

type Props = {
  list:string[]; 
  name:string;
  checkedList: string[];
}

const CheckboxList = ({list, name, checkedList}: Props) :JSX.Element => {
    

    return (
    <div>
        <h3>{name}</h3>
        <ul>
          {list.map((option:string) => {
              if(checkedList.includes(option)){
                return (
                <CheckboxElementPreSelectedOnRender key={option} option={option} name={name} />)
              }
              return (
                <CheckboxElement  key={option} option={option} name={name} />
              );
            })}
        </ul>
      </div>
    )
}

export default CheckboxList
