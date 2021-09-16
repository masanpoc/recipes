export function getRecipesArrFromResponse(data: { hits: { recipe: { uri: string; label: string; image: string; url: string; totalTime: number } }[] }): any  {
    return data.hits.map((el: { recipe: { uri: string; label: string; image: string; url: string; totalTime: number; }; })=>{
        return {
          id: el.recipe.uri,
          title: el.recipe.label,
          image: el.recipe.image,
          source: el.recipe.url,
          time: el.recipe.totalTime
        } 
    })
}