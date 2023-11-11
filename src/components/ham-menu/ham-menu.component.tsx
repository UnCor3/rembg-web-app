import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectAppState } from "../../store/selectors/selectors";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { SET_IS_HAM_MENU_OPEN } from "../../store/reducers/app-state.reducer";
import { defaultVariant } from "../../lib/framer-motion";
import { Variants, motion } from "framer-motion";
import { laptop } from "../../lib/responsive";
import { AiFillGithub } from "react-icons/ai";
import { GITHUB_PROFILE } from "../../constants/constants";

const HamMenu = () => {
  const { isHamMenuOpen } = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(SET_IS_HAM_MENU_OPEN(!isHamMenuOpen));
  };

  return (
    <>
      <BarsContainer onClick={handleOnClick} $isOpen={isHamMenuOpen}>
        {Array.from({ length: 3 }, (_, i) => (
          <Bar key={i}></Bar>
        ))}
      </BarsContainer>
      {isHamMenuOpen ? (
        <Container>
          <Children>
            <a target="_blank" href={GITHUB_PROFILE}>
              <AiFillGithub /> <span>Github</span>
            </a>
          </Children>
        </Container>
      ) : null}
    </>
  );
};

const Bar = styled.div.attrs({ className: "bar" })`
  width: 20px;
  height: 3px;
  background-color: black;
`;

const variants: Variants = {
  initial: {
    opacity: 0.2,
  },
  animate: {
    opacity: 1,
  },
};

const Children = styled.div`
  font-size: 2rem;

  > a {
    padding: 1rem;
  }
`;

const Container = styled(motion.div).attrs({ ...defaultVariant, variants })`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  @supports not (filter: blur()) {
    background-color: whitesmoke;
  }
  height: calc(100vh - 100%);
  //*responsiveness
  ${laptop(css`
    display: none;
  `)}
`;

const BarsContainer = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  cursor: pointer;
  @supports (justify-content: space-evenly) {
    justify-content: space-evenly;
    gap: 0;
  }
  height: 100%;
  ${Bar} {
    transition: all ease 400ms;
    transform-origin: 0 0;
    transform-origin: 100% 50%;
  }
  ${(props) =>
    props.$isOpen
      ? css`
          ${Bar}:nth-child(1) {
            transform: rotate(-45deg) translateX(-1px);
          }
          ${Bar}:nth-child(2) {
            opacity: 0;
          }
          ${Bar}:nth-child(3) {
            transform: rotate(45deg) translateX(-1px);
          }
        `
      : null}

  //*responsiveness
    ${laptop(css`
    display: none;
  `)}
`;

export default HamMenu;
