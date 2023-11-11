import { forwardRef } from "react";
import styled, { css } from "styled-components";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ImageType } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { REMOVE_INPUT_IMG } from "../../store/reducers/input-images.reducer";
import Files from "./children/files";
import { defaultVariant } from "../../lib/framer-motion";
import { laptop } from "../../lib/responsive";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectAppState } from "../../store/selectors/selectors";

const container: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0.2,
    y: +30,
    transition: { duration: 0.15 },
  },
};

const EditFiles = forwardRef<HTMLInputElement, { imgs: ImageType[] }>(
  ({ imgs }, ref) => {
    const dispatch = useAppDispatch();
    const { imgsDisplayedOnRow, status } = useAppSelector(selectAppState);

    const handleEditFiles = (name: string) => {
      //*due to typescript ,need to make these checks
      if (ref && typeof ref !== "function" && ref.current) {
        const { current: inputRef } = ref;
        dispatch(REMOVE_INPUT_IMG({ name, inputRef }));
      }
    };

    //render when we have some files and status is idle
    const render = !!imgs.length && status === "idle";
    return (
      <AnimatePresence>
        {render ? (
          <Container variants={container} {...defaultVariant}>
            <FilesMap $status={status} $imgsDisplayedOnRow={imgsDisplayedOnRow}>
              <Files imgs={imgs} handleEditFiles={handleEditFiles} />
            </FilesMap>
          </Container>
        ) : null}
      </AnimatePresence>
    );
  }
);

const Container = motion(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`);

const FilesMap = motion(styled.div<{
  $imgsDisplayedOnRow: boolean;
  $status: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  margin: 1rem 0rem;
  margin-top: 4rem;
  ${laptop(css`
    ${(props) =>
      //@ts-ignore
      props.$imgsDisplayedOnRow
        ? css`
            margin-top: 4rem;
          `
        : css`
            margin-top: 1rem;
          `}
  `)}
`);

export default EditFiles;
