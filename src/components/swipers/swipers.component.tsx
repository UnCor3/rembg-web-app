import { ImagesInitialType } from "../rembg-form/rembg-form.component";
import { selectAppState } from "../../store/selectors/selectors";
import { useAppSelector } from "../../hooks/useAppSelector";
import { AnimatePresence } from "framer-motion";
import styled, { css } from "styled-components";
import { tablet } from "../../lib/responsive";
import ToolBar from "./children/toolbar";
import { FC, useState } from "react";
import SwiperPages from "./children/swiper-pages/swiper-pages";

const Swipers: FC<{ input: ImagesInitialType; output: ImagesInitialType }> = ({
  input,
  output,
}) => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const { safeToAppendSwipers, imgsDisplayedOnRow } =
    useAppSelector(selectAppState);

  return (
    <>
      {safeToAppendSwipers ? (
        <>
          <AnimatePresence>
            <SwiperPages
              data={input}
              extra={{
                onSwiper: setFirstSwiper,
                controller: { control: secondSwiper },
                watchSlidesProgress: true,
                pagination: {
                  clickable: true,
                },
              }}
            />
          </AnimatePresence>
          <Divider $imgsDisplayedOnRow={imgsDisplayedOnRow}>
            <ToolBar />
          </Divider>
          <AnimatePresence>
            <SwiperPages
              data={output}
              extra={{
                onSwiper: setSecondSwiper,
                controller: { control: firstSwiper },
                watchSlidesProgress: true,
                pagination: {
                  clickable: true,
                },
              }}
              bg={"png-bg.jpg"}
            />
          </AnimatePresence>
        </>
      ) : null}
    </>
  );
};

//*STYLES
const Divider = styled.div<{ $imgsDisplayedOnRow: boolean }>`
  background: black;
  margin: 2rem 0;
  ${tablet(css`
    height: 100%;
    background: none;
    margin: 0;
    border: 1px solid black;
    display: flex;
    align-items: center;
    border-radius: 5px;
  `)}
  //*Row conditional css
  ${tablet(css`
    ${(props) =>
      //@ts-ignore
      !props.$imgsDisplayedOnRow
        ? css`
            margin: 1rem auto;
            width: min-content;
          `
        : css`
            margin: auto;
          `}
  `)}
`;

export default Swipers;
