import React from 'react'
import styled from 'styled-components'
import { flexColumnBox } from '../../styles/mixins'

const StyledWrapper = styled.div`
    height: 100vh;
    ${flexColumnBox({})};
`

const Fallback = ():JSX.Element => {
    return (
        <StyledWrapper >
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </StyledWrapper>
        
    )
}

export default Fallback
