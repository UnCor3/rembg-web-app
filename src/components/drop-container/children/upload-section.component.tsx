import { Variants, motion, usePresence } from "framer-motion";
import { FC, useEffect } from "react";
import styled, { css } from "styled-components";
import React from "react";
import { selectInputImages } from "../../../store/selectors/selectors";
import { useDispatch, useSelector } from "react-redux";
import { SET_SAFE_TO_APPEND_SWIPERS } from "../../../store/reducers/app-state.reducer";
import { laptop } from "../../../lib/responsive";
import { defaultVariant } from "../../../lib/framer-motion";

type Props = {
  uploadSectionRef: React.MutableRefObject<HTMLInputElement | null>;
  handleImgInputClick: () => void;
  children: React.ReactNode;
};

const UploadSection: FC<Props> = ({
  uploadSectionRef,
  handleImgInputClick,
  children,
}) => {
  const [isPresent, safeToRemove] = usePresence();
  const { imgs } = useSelector(selectInputImages);
  const delayTime = imgs.length * 130;

  const dispatch = useDispatch();
  useEffect(() => {
    !isPresent &&
      setTimeout(() => {
        safeToRemove();
        dispatch(SET_SAFE_TO_APPEND_SWIPERS(true));
      }, delayTime);
  }, [isPresent]);

  return (
    <Container
      ref={uploadSectionRef}
      onClick={handleImgInputClick}
      variants={DottedVariant}
      {...defaultVariant}
    >
      {children}
    </Container>
  );
};

export default UploadSection;

const DottedVariant: Variants = {
  initial: {
    y: +30,
    scale: 0.95,
    opacity: 0.7,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    y: +30,
    scale: 0.9,
    opacity: 0.3,
    transition: {
      duration: 0,
    },
  },
};

const Container = motion(styled.div`
  display: none;
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all ease 400ms;
  position: relative;

  //*responsiveness
  ${laptop(css`
    /* border: 4px dotted #c0dd1bc3; */
    /* box-shadow: 0px 10px 35px -3px rgba(0, 0, 0, 0.1); */
    /* height: "400px"; */
  `)}
`);
