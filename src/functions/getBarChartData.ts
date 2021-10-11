export function getBarChartData ( data: { recipe: { totalDaily: any; yield: any; }; } ) {
    const listNutrients = data.recipe.totalDaily;
    const numberOfServes = data.recipe.yield;
    const pieChartData = {
        ENERC_KCAL: { 
            label: listNutrients.ENERC_KCAL.label,
            quantity: Math.round(listNutrients.ENERC_KCAL.quantity / numberOfServes * 100)/100
        },
        CHOCDF: { 
            label: listNutrients.CHOCDF.label,
            quantity: Math.round(listNutrients.CHOCDF.quantity / numberOfServes * 100)/100
        },
        PROCNT: { 
            label: listNutrients.PROCNT.label,
            quantity: Math.round(listNutrients.PROCNT.quantity / numberOfServes * 100)/100
        },
        FAT: { 
            label: listNutrients.FAT.label,
            quantity: Math.round(listNutrients.FAT.quantity / numberOfServes * 100)/100
        },
        FIBTG: { 
            label: listNutrients.FIBTG.label,
            quantity: Math.round(listNutrients.FIBTG.quantity / numberOfServes * 100)/100
        },
        CA: { 
            label: listNutrients.CA.label,
            quantity: Math.round(listNutrients.CA.quantity / numberOfServes * 100)/100
        },
        FE: { 
            label: listNutrients.FE.label,
            quantity: Math.round(listNutrients.FE.quantity / numberOfServes * 100)/100
        },
        ZN: { 
            label: listNutrients.ZN.label,
            quantity: Math.round(listNutrients.ZN.quantity / numberOfServes * 100)/100
        },
        VITC: { 
            label: listNutrients.VITC.label,
            quantity: Math.round(listNutrients.VITC.quantity / numberOfServes * 100)/100
        },
        FOLDFE: { 
            label: listNutrients.FOLDFE.label,
            quantity: Math.round(listNutrients.FOLDFE.quantity / numberOfServes * 100)/100
        },
        VITB12: { 
            label: listNutrients.VITB12.label,
            quantity: Math.round(listNutrients.VITB12.quantity / numberOfServes * 100)/100
        },
        VITD: { 
            label: listNutrients.VITD.label,
            quantity: Math.round(listNutrients.VITD.quantity / numberOfServes * 100)/100
        },
    }
    return pieChartData
}