import { laptop, laptopL } from "../../lib/responsive";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectAppState,
  selectInputImages,
} from "../../store/selectors/selectors";
import styled, { css } from "styled-components";

const Title = () => {
  const { status } = useAppSelector(selectAppState);
  const { imgs } = useAppSelector(selectInputImages);

  //!Render only when no img inputs and status of idle
  const render = status === "idle" && !imgs.length;

  return render ? <_Title>Upload an image to remove background</_Title> : null;
};

export default Title;

//*STYLES
const _Title = styled.h1`
  color: var(--color-grey);
  text-align: center;
  margin: auto;
  margin-top: 8%;
  margin-bottom: 0rem;
  width: 60%;

  ${laptop(css`
    width: 100%;
    font-size: 2.5rem;
  `)}

  ${laptopL(css`
    font-size: 3.5rem;
  `)}

  position: relative;
  z-index: 1;
`;
