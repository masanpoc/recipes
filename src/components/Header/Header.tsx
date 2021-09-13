import React from 'react';
import styled from 'styled-components'
import bgHeader200 from './Images/bgHeader_w_200.jpg'
import bgHeader709 from './Images/bgHeader_w_709.jpg'
import bgHeader1033 from './Images/bgHeader_w_1033.jpg'
import bgHeader1303 from './Images/bgHeader_w_1303.jpg'
import bgHeader1400 from './Images/bgHeader_w_1400.jpg'

const StyledHeader = styled.header`
    height: 20vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    @media (max-width: 480px) {
        height: 30vh;
    }
`

const Title = styled.h2`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    z-index: 1;
`

const Image = styled.img`
    height: auto;
    width: 100vw;
    display: inline-block;
    text-align: center;
    position: absolute;
    z-index: 0;
`

const Header = ():JSX.Element => {
    return (
        <StyledHeader>
            <Title>Cooking recipes</Title>
            <Image
                sizes="(max-width: 1400px) 100vw, 80vw"
                srcSet={`
                ${bgHeader200} 200w,
                ${bgHeader709} 709w,
                ${bgHeader1033} 1033w,
                ${bgHeader1303} 1303w,
                ${bgHeader1400} 1400w`}
                src={bgHeader1400}
                alt="">
            </Image>
            {/* {bgHeader1033} */}
        </StyledHeader>
    )
}

export default Header
