import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

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
    width:number;
    border:boolean;
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

const colors = [ '#00008B', '#1F75FE', '#74BBFB' ];

const PieChartComponent = ({data, width, border}:Props):JSX.Element => {

    const [dataVisuals, setDataVisuals] = useState<{[key: string]: any}[]>([{}])

    useEffect(() => {
        // console.log(Object.values(data), 'passed data to pie chart')
        setDataVisuals(Object.values(data));
    }, [data])
    
    return (
        <>
        {dataVisuals[0].quantity>0 &&
        <ResponsiveContainer width='100%' height={350}>
            <PieChart 
                style={ 
                    {padding: '10% 0 5% 0',
                    borderRight: (width>=768 && border) && '1px solid grey',
                    borderBottom: (width<768 && border) && '1px solid grey',   
                    }
                }
            >
                <Pie
                    dataKey="quantity"
                    data={dataVisuals}
                    outerRadius={width<768 ? 50 : 70}
                    cy='55%'
                    isAnimationActive={false}
                    label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        value,
                        index
                      }) => {
                        const RADIAN = Math.PI / 180;
                        // eslint-disable-next-line
                        const radius = 25 + innerRadius + (outerRadius - innerRadius);
                        // eslint-disable-next-line
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        // eslint-disable-next-line
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#000000"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                            style={{'fontWeight': 'bold'}}
                          >
                              {index == 0 
                              ? `${dataVisuals[index].label} (${value} %)`
                                : <>  
                                <tspan>{dataVisuals[index].label}</tspan> 
                                <tspan x={x} y={y+20}>({`${value} %`})</tspan>
                                </>
                            }
                          </text>
                        );
                      }}
                >
                    {
                    dataVisuals.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]}/>
                    ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        }
        </>
    )
}

export default PieChartComponent



