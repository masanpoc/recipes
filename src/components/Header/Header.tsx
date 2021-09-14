import React from 'react';
import styled from 'styled-components'
import bgHeader200 from './Images/bgHeader_w_200.jpg'
import bgHeader435 from './Images/bgHeader_w_435.jpg'
import bgHeader617 from './Images/bgHeader_w_617.jpg'
import bgHeader772 from './Images/bgHeader_w_772.jpg'
import bgHeader910 from './Images/bgHeader_w_910.jpg'
import bgHeader1020 from './Images/bgHeader_w_1020.jpg'
import bgHeader1149 from './Images/bgHeader_w_1149.jpg'
import bgHeader1386 from './Images/bgHeader_w_1386.jpg'
import bgHeader1384 from './Images/bgHeader_w_1384.jpg'
import bgHeader1400 from './Images/bgHeader_w_1400.jpg'
import bgHeaderCropped200 from './Images/bgHeaderCropped_w_200.jpg';
import bgHeaderCropped373 from './Images/bgHeaderCropped_w_373.jpg';
import bgHeaderCropped503 from './Images/bgHeaderCropped_w_503.jpg';
import bgHeaderCropped636 from './Images/bgHeaderCropped_w_636.jpg';
import bgHeaderCropped715 from './Images/bgHeaderCropped_w_715.jpg';
import bgHeaderCropped911 from './Images/bgHeaderCropped_w_911.jpg';
import bgHeaderCropped1013 from './Images/bgHeaderCropped_w_1013.jpg';
import bgHeaderCropped1124 from './Images/bgHeaderCropped_w_1124.jpg';
import bgHeaderCropped1221 from './Images/bgHeaderCropped_w_1221.jpg';
import bgHeaderCropped1316 from './Images/bgHeaderCropped_w_1316.jpg';
import bgHeaderCropped1393 from './Images/bgHeaderCropped_w_1393.jpg';
import bgHeaderCropped1398 from './Images/bgHeaderCropped_w_1398.jpg';
import bgHeaderCropped1400 from './Images/bgHeaderCropped_w_1400.jpg';


const StyledHeader = styled.header`
    height: 30vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
    @media (min-width: 480px) {
        height: 20vh;
    }
`

const Title = styled.h2`
    width: 100%;
    height: 100%;
    color: rgba(255, 255, 255, 0.8);
    z-index: 2;
    font-family: 'Exo';
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    font-size: 2.5em;
    @media (min-width: 480px) {
        font-size: 2.75em;
        flex-direction: row;
        > * {
            letter-spacing: 0.1em;
            
            &:nth-child(1) {
                margin-right: 2%;
            }
        }
    }
    @media (min-width: 768px) {
        font-size: 3.5em;
    }
`

const Image = styled.img`
    height: auto;
    width: 100vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
`


const Header = ():JSX.Element => {
    return (
        <StyledHeader>
            <Title>
                <span>COOKING</span> 
                <span>RECIPES</span>
            </Title>

            <picture>

                <Image 
                sizes="(max-width: 1400px) 100vw, 1400px"
                as="source"
                srcSet={`
                ${bgHeader200} 200w,
                ${bgHeader435} 435w,
                ${bgHeader617} 617w,
                ${bgHeader772} 772w,
                ${bgHeader910} 910w,
                ${bgHeader1020} 1020w,
                ${bgHeader1149} 1149w,
                ${bgHeader1386} 1386w,
                ${bgHeader1384} 1384w,
                ${bgHeader1400} 1400w
                `}
                media="(min-width: 768px)" />

                <Image
                sizes="(max-width: 1400px) 100vw, 1400px"
                srcSet={`
                ${bgHeaderCropped200} 200w,
                ${bgHeaderCropped373} 373w,
                ${bgHeaderCropped503} 503w,
                ${bgHeaderCropped636} 636w,
                ${bgHeaderCropped715} 715w,
                ${bgHeaderCropped911} 911w,
                ${bgHeaderCropped1013} 1013w,
                ${bgHeaderCropped1124} 1124w,
                ${bgHeaderCropped1221} 1221w,
                ${bgHeaderCropped1316} 1316w,
                ${bgHeaderCropped1398} 1398w,
                ${bgHeaderCropped1393} 1393w,
                ${bgHeaderCropped1400} 1400w
                `}
                src={bgHeaderCropped1400}
                alt="" />

            </picture>

        </StyledHeader>
    )
}

export default Header
