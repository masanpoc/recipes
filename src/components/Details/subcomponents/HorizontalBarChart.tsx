import React, { ReactElement, useEffect, useState } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import styled from 'styled-components'
import { flexColumnBox } from '../../../styles/mixins'


const StyledWrapperDiv = styled.div`
    height: 140vh;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    width: 100%;
    position: relative;
    ${flexColumnBox({})}
    @media(min-width: 768px){
        height: 110vh;
    }
`

const StyledTitle = styled.h2`
    position: absolute;
    font-size: 1.3em;
    width: -webkit-max-content;
    top: 6%;
    width: 85%;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    @media(min-width: 768px){
        top: 8%;
        font-size: 1.65em;
        width: max-content;
        left: 50%;
        transform: translateX(-50%);
    }
`

export const emptyNutrients = {
    ENERC_KCAL: { 
        label: '',
        quantity: 0
    },
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
    FIBTG: { 
        label: '',
        quantity: 0
    },
    CA: { 
        label: '',
        quantity: 0
    },
    FE: { 
        label: '',
        quantity: 0
    },
    ZN: { 
        label: '',
        quantity: 0
    },
    VITC: { 
        label: '',
        quantity: 0
    },
    FOLDFE: { 
        label: '',
        quantity: 0
    },
    VITB12: { 
        label: '',
        quantity: 0
    },
    VITD: { 
        label: '',
        quantity: 0
    },
}




type nutrient = {
    label: string;
    quantity: number;
}

export interface Nutrients {
    ENERC_KCAL: nutrient;
    CHOCDF: nutrient;
    PROCNT: nutrient;
    FAT: nutrient;
    FIBTG: nutrient;
    CA: nutrient;
    FE: nutrient;
    ZN: nutrient;
    VITC: nutrient;
    FOLDFE: nutrient;
    VITB12: nutrient;
    VITD: nutrient;
}

type Props = {
    data: Nutrients;
    screenWidth: number;
}

const HorizontalBarChart = ({data, screenWidth}: Props):JSX.Element => {

    const [dataVisuals, setDataVisuals] = useState<{[key: string]: any}[]>([{}])

    useEffect(() => {
        // console.log(Object.values(data), 'passed data to pie chart')
        const tmp = Object.values(data);
        tmp.forEach(nutrient=>{
            if(nutrient.quantity>=100){
                // no percentage remaining for values>100
                nutrient.remaining = 0;
            }
            else {
                // add percentage remaining value
                nutrient.remaining=100-nutrient.quantity;
            }
        });
        // console.log(tmp, 'added percentage remaining')
        setDataVisuals(Object.values(data));
    }, [data])
    
    function renderLabel({ payload, x, y, height, width, value, index }:any):(any) {
        if(screenWidth<768 && value>25){
            return (
                <text x={x+width/2} y={y+15}  fill="rgba(255,255,255,0.8)" textAnchor="middle">
                  {value == 100 ? `fulfilled (${dataVisuals[index].quantity}%)` : `${value}%`}
                </text>
              );
        }
        if ( screenWidth>=768 && value > 10) {
          return (
            <text x={x+width/2} y={y+15}  fill="rgba(255,255,255,0.8)" textAnchor="middle">
              {value == 100 ? `fulfilled (${dataVisuals[index].quantity}%)` : `${value}%`}
            </text>
          );
        } 
        return null;
    }

    return (
        <StyledWrapperDiv>
            <StyledTitle>Nutrition in % of the daily requirement</StyledTitle>
            <ResponsiveContainer width={screenWidth<768 ? '100%' : '90%'} height={screenWidth<768 ? '85%' : '75%'}>
                <BarChart
                layout="vertical"
                data={dataVisuals}
                margin={{
                    top: screenWidth<768 ? 90 : 70,
                    right: screenWidth<768 ? 30 : 70,
                    left: screenWidth<768 ? 30 : 40,
                    bottom: screenWidth<768 ? 0 : 20
                }}
                >
                <CartesianGrid />
                {screenWidth<768 
                    ? <YAxis dataKey="label" type="category" stroke='black' />
                    : <YAxis dataKey="label" type="category" stroke='black' width={160} />
                }
                <XAxis type="number" allowDataOverflow={true} domain={[0, 100]}  unit='%' stroke='black' />
                <Bar
                    dataKey="quantity"
                    fill="#00008B"
                    stackId="a"
                    maxBarSize={20}
                    label={renderLabel}
                ></Bar>
                <Bar dataKey="remaining" fill="#74BBFB" stackId="a" maxBarSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </StyledWrapperDiv>
    )
}

export default HorizontalBarChart




