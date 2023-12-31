import { AnimatePresence, Variants, motion } from "framer-motion";
import styled, { css } from "styled-components";
import { FC } from "react";
import { defaultVariant } from "../../lib/framer-motion";
import { tablet } from "../../lib/responsive";
import useMeasure from "react-use-measure";
import { useSelector } from "react-redux";
import {
  selectAppState,
  selectInputImages,
} from "../../store/selectors/selectors";

//*Input-Output-Container
const IOContainer: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ref, { height }] = useMeasure();
  const { imgsDisplayedOnRow } = useSelector(selectAppState);
  const { imgs } = useSelector(selectInputImages);

  return (
    <AnimatePresence>
      <Container
        variants={ioContainerVariants}
        {...defaultVariant}
        //*changing height depending on children's height
        //*children has height ? children height : 0
        style={{ height: height > 0 ? height.toString() : "" }}
      >
        <ResizablePanel
          ref={ref}
          $imgsDisplayedOnRow={imgsDisplayedOnRow}
          $imgs={!!imgs.length}
        >
          {children}
        </ResizablePanel>
      </Container>
    </AnimatePresence>
  );
};

export default IOContainer;

//*STYLES
const ioContainerVariants: Variants = {
  initial: {
    y: +20,
    opacity: 0.5,
    scale: 0.9,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

const Container = styled(motion.div)``;

const ResizablePanel = styled.div<{
  $imgsDisplayedOnRow: boolean;
  $imgs: boolean;
}>`
  transition: height 500ms ease;
  display: flex;
  flex-direction: column;

  ${tablet(css`
    ${(props) =>
      //*Conditional css to switch between row to column
      //@ts-ignore
      props.$imgsDisplayedOnRow
        ? css`
            flex-direction: row;
            > *:first-child {
              margin-right: 2rem;
              width: calc(50% - 25px - 2rem);
            }
            > *:nth-child(2) {
              width: 50px;
            }
            > *:nth-child(3) {
              margin-left: 2rem;
              width: calc(50% - 25px - 2rem);
            }
          `
        : css`
            flex-direction: column;
          `}
  `)}
  //*Once we have imgs and are displayed on row margin is added
  ${(props) =>
    props.$imgsDisplayedOnRow && props.$imgs
      ? css`
          margin-bottom: 5%;
        `
      : css`
          margin-bottom: unset;
        `}
`;
