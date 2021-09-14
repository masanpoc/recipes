import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
    height: 30vh;
    width: 100%;
    background: #000000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media (min-width: 480px) {
        height: 20vh;
    }
`

const Footer = (): JSX.Element => {
    return (
        <StyledFooter>
            <h3 style={{"color": "white"}}>
                Contact info
            </h3>
            <div id="edamam-badge" data-color="white"></div>
        </StyledFooter>
    )
}

export default Footer
