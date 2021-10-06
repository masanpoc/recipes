import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, LabelList, ResponsiveContainer } from "recharts";

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

const colors = [ 'grey', 'red', 'blue' ];

const PieChartComponent = ({data}:Props):JSX.Element => {

    const [dataVisuals, setDataVisuals] = useState<{[key: string]: any}[]>([{}])

    useEffect(() => {
        console.log(Object.values(data), 'passed data to pie chart')
        setDataVisuals(Object.values(data));
    }, [data])
    
    return (
            <PieChart width={400} height={400} 
            style={{border: '1px solid'}}
            >
                <Pie
                    dataKey="quantity"
                    data={dataVisuals}
                    outerRadius={100}
                    label={true}
                >
                    {
                    dataVisuals.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                    ))
                    }
                    <LabelList dataKey='label' stroke='black' />
                </Pie>
            </PieChart>
    )
}

export default PieChartComponent



