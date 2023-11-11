import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const BtnDefault = motion(styled.button`
  all: unset;
  background: black;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color ease 400ms;
  &:hover {
    background-color: var(--color-dark-green);
  }
`);

// eslint-disable-next-line react-refresh/only-export-components
export const BtnDefaultStyles = css`
  background: black;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-dark-green);
  }
`;
