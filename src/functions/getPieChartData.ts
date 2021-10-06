
export function getPieChartData ( data: {recipe: { totalNutrients: { [key: string]: any }, yield: number}} ) {
    const listNutrients = data.recipe.totalNutrients;
    const total = listNutrients.CHOCDF.quantity + listNutrients.PROCNT.quantity + listNutrients.FAT.quantity; 
    const pieChartData = {
        CHOCDF: { 
            label: listNutrients.CHOCDF.label,
            quantity: Math.round(((listNutrients.CHOCDF.quantity / total) * 100) * 100)/100
        },
        PROCNT: { 
            label: listNutrients.PROCNT.label,
            quantity: Math.round(((listNutrients.PROCNT.quantity / total) * 100) * 100)/100
        },
        FAT: { 
            label: listNutrients.FAT.label,
            quantity: Math.round(((listNutrients.FAT.quantity / total) * 100) * 100)/100
        },
    }
    return pieChartData
}