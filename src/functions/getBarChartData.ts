export function getBarChartData ( data: { recipe: { totalDaily: any; yield: any; }; } ) {
    const listNutrients = data.recipe.totalDaily;
    const numberOfServes = data.recipe.yield;
    const pieChartData = {
        ENERC_KCAL: { 
            label: listNutrients.ENERC_KCAL,
            quantity: Math.round(listNutrients.ENERC_KCAL.quantity / numberOfServes * 100)/100
        },
        CHOCDF: { 
            label: listNutrients.CHOCDF,
            quantity: Math.round(listNutrients.CHOCDF.quantity / numberOfServes * 100)/100
        },
        PROCNT: { 
            label: listNutrients.PROCNT,
            quantity: Math.round(listNutrients.PROCNT.quantity / numberOfServes * 100)/100
        },
        FAT: { 
            label: listNutrients.FAT,
            quantity: Math.round(listNutrients.FAT.quantity / numberOfServes * 100)/100
        },
        FIBTG: { 
            label: listNutrients.FIBTG,
            quantity: Math.round(listNutrients.FIBTG.quantity / numberOfServes * 100)/100
        },
        CA: { 
            label: listNutrients.CA,
            quantity: Math.round(listNutrients.CA.quantity / numberOfServes * 100)/100
        },
        FE: { 
            label: listNutrients.FE,
            quantity: Math.round(listNutrients.FE.quantity / numberOfServes * 100)/100
        },
        ZN: { 
            label: listNutrients.ZN,
            quantity: Math.round(listNutrients.ZN.quantity / numberOfServes * 100)/100
        },
        VITC: { 
            label: listNutrients.VITC,
            quantity: Math.round(listNutrients.VITC.quantity / numberOfServes * 100)/100
        },
        FOLDFE: { 
            label: listNutrients.FOLDFE,
            quantity: Math.round(listNutrients.FOLDFE.quantity / numberOfServes * 100)/100
        },
        VITB12: { 
            label: listNutrients.VITB12,
            quantity: Math.round(listNutrients.VITB12.quantity / numberOfServes * 100)/100
        },
        VITD: { 
            label: listNutrients.VITD,
            quantity: Math.round(listNutrients.VITD.quantity / numberOfServes * 100)/100
        },
    }
    return pieChartData
}