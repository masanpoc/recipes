import { getFormattedQuery } from "./getFormattedQuery";
import {IForm} from '../types/types'

export default function getFormattedQueryOfFilters(filters : {[key: string]: any}):string {
    
    let str='';
    // eslint-disable-next-line prefer-const
    for(let key in filters) {
        const field = String(key);
        filters[key].forEach((value:string)=>{
            str=str.concat(`&${field}=${getFormattedQuery(value)}`)
        })
    }
    return str
}