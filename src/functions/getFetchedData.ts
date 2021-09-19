import {Response} from '../types/types'

export default async function getFetchedData(url:string) : Promise<Response>  {
    const response = await fetch(url);
    const data = await response.json();
    return data
}