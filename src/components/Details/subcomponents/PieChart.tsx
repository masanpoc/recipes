import React, { useEffect } from 'react'

type nutrient = {
    label: string;
    quantity: number;
}

export interface Macro {
    CHOCDF: nutrient;
    PROCNT: nutrient;
    FAT: nutrient;
}

type Props = {
    data: Macro;
}

export const emptyMacro = {
    CHOCDF: { 
        label: '',
        quantity: 0
    },
    PROCNT: { 
        label: '',
        quantity: 0
    },
    FAT: { 
        label: '',
        quantity: 0
    },
}

const PieChart = ({data}:Props):JSX.Element => {

    useEffect(() => {
        console.log(data, 'passed data to pie chart')
    }, [data])
    
    return (
        <div>
            
        </div>
    )
}

export default PieChart
