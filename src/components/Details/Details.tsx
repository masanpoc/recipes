import React from 'react'


type Props = {
    data: string
}

const Details = ({ data }: Props): JSX.Element => {
    return (
        <div>
            details
            {data}
        </div>
    )
}

export default Details
