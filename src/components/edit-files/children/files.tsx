import { AnimatePresence, Variants, motion } from "framer-motion";
import { FC } from "react";
import { ImageType } from "../../../types";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { shortenText } from "../../../utils/shortenText";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectAppState } from "../../../store/selectors/selectors";
import { defaultVariant } from "../../../lib/framer-motion";

const Files: FC<{
  imgs: ImageType[];
  handleEditFiles: (name: string) => void;
}> = ({ imgs, handleEditFiles }) => {
  const { status } = useAppSelector(selectAppState);
  const render = status === "idle";
  return (
    <AnimatePresence mode="sync">
      {render
        ? imgs.map((img, i) => (
            <File
              variants={item}
              {...defaultVariant}
              key={img.name}
              custom={i}
              layout
            >
              {shortenText(img.name, 17)}
              <IconWrapper
                key={img.name}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleEditFiles(img.name)}
              >
                <ImCancelCircle style={{ cursor: "pointer" }} />
              </IconWrapper>
            </File>
          ))
        : null}
    </AnimatePresence>
  );
};

export default Files;

const item: Variants = {
  initial: { opacity: 0.3, scale: 0.95 },
  animate: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }),
  exit: (i) => ({
    opacity: 0.3,
    scale: 0.95,
    y: +10,
    transition: { delay: i * 0.05 },
  }),
};

const File = motion(styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  width: 210px;
`);

const IconWrapper = motion(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 400ms ease;
  &:hover {
    color: red;
  }
`);
