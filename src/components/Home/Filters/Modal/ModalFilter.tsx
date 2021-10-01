import React, { useContext } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import CheckboxList from "../subcomponents/CheckboxList";
import optionsList from "../lists/optionsList";
import { SearchContext } from "../../../App";
import { FormContext } from "../Filters";

const StyledCloseSVG = styled.svg`
  height: 17.5px;
  width: 17.5px;
  fill: #787878;
`;

const StyledClearButton = styled.button`
  width: fit-content;
  height: max-content;
  background: white;
  font-size: 1em;
  padding: 1.5% 3%;
  /* color: #4B4B4B; */
  margin-left: 5%;
  border: none;
  box-shadow: 0 0 1px 0px black;
  border-radius: 6px;
`;

const StyledCloseButton = styled.button`
  background: none;
  border: none;
  height: min-content;
  margin-left: 61%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledMobileTitleDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: max-content;
  height: 11.25%;
  box-shadow: 0px 0.5px 0px 0px rgb(0 0 0 / 45%);
`;

const StyledMobileModalDiv =styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: scroll; */
  justify-content: center;
`;

const StyledWrapperModal = styled(motion.div)`
  background: white;
  display: flex;
  flex-direction: column;
  position: absolute;
  /* increase size */
  height: 71vh;
  width: 100%;
  transform: translateY(21%);
`;

const StyledMask = styled.div`
  overflow: scroll;
  height: 67%;
  width: 100%;
  padding: 1% 0 5.75% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFilterFooterDiv = styled.div`
  /* background: yellow; */
  display: flex;
  height: 15%;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0px -0.5px 0px 0px rgb(0 0 0 / 45%);
`;

const StyledApplyButton = styled.button`
  color: #2c2c2c;
  border: none;
  font-size: 1em;
  padding: 2.5% 4%;
  border-radius: 6px;

  height: max-content;
  width: max-content;
  margin-right: 4%;

  /* padding: 4% 0; */
  box-shadow: inset 3px 3px 10px -6px #faf0f0bf;
  background: #989898;
  color: white;
`;

type Props = {
  isActive: boolean;
};

const containerVariants ={
  down: {
    y:'120%'
  },
  up: {
    y:'22%'
  },
}

const ModalFilter = ({ isActive }: Props): JSX.Element => {
  const searchCntxt = useContext(SearchContext);
  const formCntxt = useContext(FormContext);
  function updateFilters(event: any) {
    event.preventDefault();
    console.log(formCntxt.state);
    searchCntxt.dispatch({ type: "FILTERS", value: formCntxt.state });
  }

  return (
      
        createPortal(
          <AnimatePresence>
            {isActive &&
          <StyledMobileModalDiv>
              <StyledWrapperModal
              as={motion.div}
              variants={containerVariants}
              initial="down"
              animate="up"
              exit="down"
              transition={{
                type: 'easeIn',
                duration: 0.4
              }}
            >
              <StyledMobileTitleDiv>
                <StyledClearButton
                  type="button"
                  onClick={() =>
                    formCntxt.dispatch({
                      type: "CLEAR_FILTERS",
                      value: {
                        input: "",
                        selected: [],
                        checked: false,
                        isActive: false,
                      },
                    })
                  }
                >
                  Clear All
                </StyledClearButton>
                <StyledCloseButton
                  type="button"
                  onClick={() =>
                    formCntxt.dispatch({
                      type: "UPDATE_DISPLAY",
                      value: {
                        input: "",
                        selected: [],
                        checked: false,
                        isActive: false,
                      },
                    })
                  }
                >
                  <StyledCloseSVG
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                  </StyledCloseSVG>
                </StyledCloseButton>
              </StyledMobileTitleDiv>
              <StyledMask>
                {optionsList.map((el) => {
                  if (typeof el.filter == "string") {
                    return (
                      <CheckboxList
                        checkedList={searchCntxt.state.filters[el.filter]}
                        list={el.options}
                        name={el.filter}
                        key={el.filter}
                      />
                    );
                  }
                })}
              </StyledMask>

              <StyledFilterFooterDiv>
                <StyledApplyButton type="submit" onClick={updateFilters}>
                  Show Results
                </StyledApplyButton>
              </StyledFilterFooterDiv>
            </StyledWrapperModal>
          </StyledMobileModalDiv>
            }
          </AnimatePresence>
          ,
          document.getElementById("modal")!
        )
  );
};

export default ModalFilter;
