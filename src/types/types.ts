export type Recipe = {
    id: string;
    title: string;
    image: string;
    source: string;
    time: number;
}

export interface IData {
    nextPage?: string | null;
    recipes: Recipe[];
}