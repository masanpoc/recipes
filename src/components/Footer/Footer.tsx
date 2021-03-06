import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 30vh;
  width: 100%;
  background: #000000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > * {
    padding-right: 35%;
    padding-bottom: 15%;
  }
  @media (min-width: 480px) {
    height: 20vh;
    & > * {
      padding-bottom: 0;
      padding-right: 5%;
    }
  }
`;

// useEffect(() => {
//     function attr() {
//         let tag;
//         const attr = document.getElementById("edamam-badge");
//         const elem = attr?.getAttribute("data-color"), url = "https://developer.edamam.com/images/";

//         switch (elem) {
//         case "light":
//             tag = "light.png";
//             break;
//         case "badge":
//             tag = "badge.png";
//             break;
//         case "dark":
//             tag = "dark.png";
//             break;
//         case "white":
//             tag = "white.png";
//             break;
//         case "transparent":
//             tag = "transparent.png";
//             break;
//         default:
//             tag = "transparent.png";
//         }
//         tag = '<a href="https://www.edamam.com" title="Powered by Edamam" target="_blank"><img alt="Powered by Edamam" src="' + url + tag + '" height="40" width="200" /></a>';
//         if(attr?.innerHTML){
//             attr.innerHTML = tag;
//         }
//     }
//     attr()
// }, [])

const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <a
        href="https://www.edamam.com"
        title="Powered by Edamam"
        target="_blank"
        rel="noreferrer"
      >
        <img
          alt="Powered by Edamam"
          src="https://developer.edamam.com/images/transparent.png"
          height="40"
          width="200"
        />
      </a>
    </StyledFooter>
  );
};

export default Footer;
