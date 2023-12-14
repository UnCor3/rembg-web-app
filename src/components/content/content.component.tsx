import { useSelector } from "react-redux";
import { selectAppState } from "../../store/selectors/selectors";
import { FC } from "react";
import styled, { css } from "styled-components";
import { laptop } from "../../lib/responsive";

const Content: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isHamMenuOpen } = useSelector(selectAppState);
  return <Container $isHamMenuOpen={isHamMenuOpen}>{children}</Container>;
};

export default Content;

//*STYLES
const Container = styled.div<{ $isHamMenuOpen: boolean }>`
  max-width: 1500px;
  min-height: 600px;
  transition: filter 200ms ease;
  padding: 0.5rem;
  ${laptop(css`
    padding: 1rem 1.5rem;
  `)}
  margin: auto;
  ${(props) =>
    //Conditional blur filter
    //Only for mobile devices
    props.$isHamMenuOpen
      ? css`
          filter: blur(10px);
          position: relative;
          z-index: -1;
          ${laptop(css`
            filter: blur(0);
            position: static;
            z-index: unset;
          `)}
        `
      : null}
`;
