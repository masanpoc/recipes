import {css} from "styled-components"

type flexColProps = {
    height?:string;
    width?:string; 
}

export const flexColumnBox = ({height, width} : flexColProps) => css`
    display: flex;
    height: ${height};
    width: ${width};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


export const flexRowBox = ({height, width} : flexColProps) => css`
    display: flex;
    height: ${height};
    width: ${width};
    justify-content: center;
    align-items: center;
`

export const alignTwoStart = (gap  ?: string) => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* :first-child {
        margin-right: ${gap};
    } */
`