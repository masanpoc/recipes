type Recipe = {
    id: string;
    title: string;
    image: string;
    source: string;
    time: number;
}

export interface IResults {
    nextPage?: string | null;
    recipes: Recipe[]
}