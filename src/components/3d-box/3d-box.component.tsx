import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const _3DBoxStyles = css`
  /* background-color: whitesmoke; */
  transform: translate3d(0px, -16px, 0px) rotateX(51deg) rotateZ(43deg);
  box-shadow: 1px 1px 0 1px #f9f9fb, -1px 0 28px 0 rgba(34, 33, 81, 0.01),
    54px 54px 28px -10px rgba(34, 33, 81, 0.15);
  border: 1px solid black;
  background-size: 5% 5%;
  background-position: 50% 50%;
`;

export const _3DBox = styled(motion.div).attrs({ className: "3d" })`
  width: 400px;
  height: 400px;
  transform: rotateX(51deg) rotateZ(43deg);
  transform-style: flat;
  border-radius: 32px;
  background-size: 500% 500%;
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
  background-color: #52acff;
  transition: 0.4s ease-in-out transform, 0.4s ease-in-out box-shadow,
    0.4s ease-in-out background-color, 1s ease-in-out border,
    background-position 300ms ease, background-size 1400ms ease;
  z-index: 1;
  margin-top: 0.4rem;
  border: 1px solid gray;
  &:hover {
    ${_3DBoxStyles}
  }
`;
