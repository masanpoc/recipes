import React, { useEffect } from 'react'

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
}

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

const BarChart = ({data}: Props):JSX.Element => {

    useEffect(() => {
        console.log(data, 'passed data to Barchart')
    }, [data])
    
    return (
        <div>
            
        </div>
    )
}

export default BarChart
