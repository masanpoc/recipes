export type Recipe = {
    id: string;
    title: string;
    image: string;
    source: string;
    time: number;
}

export interface IData {
    nextPage?: string | undefined;
    previousPage: string | undefined;
    recipes: Recipe[] | undefined;
}

export interface IPrevious {
    [key: string]: string
}

type RecipeStored = {
    recipe: {
        uri: string;
        label: string;
        image: string;
        url: string;
        dietLabels: string[] | [],
        totalTime: number
    };
    _links: {
        self: {
            href: string;
        }
    }
}
export interface Response {
    from: number;
    _links: {
        next?: {
            href: string
        }
    };
    hits: RecipeStored[]
}