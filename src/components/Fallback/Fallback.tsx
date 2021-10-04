import React from 'react'
import styled from 'styled-components'

const StyledWrapper = styled.div`
    height: 100vh;
    
`

const Fallback = ():JSX.Element => {
    return (
        <StyledWrapper>
            Loading
        </StyledWrapper>
    )
}

export default Fallback
