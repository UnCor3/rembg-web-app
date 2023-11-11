import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { defaultVariant } from "../../../lib/framer-motion";
import { downloadFile } from "../../../utils/downloadFile";
import { BtnDefault } from "../../button/button.component";
import { BsArrowRepeat } from "react-icons/bs";
import { Oval } from "react-loader-spinner";
import { GoFileZip } from "react-icons/go";
import styled from "styled-components";
import {
  selectAppState,
  selectOutputImages,
} from "../../../store/selectors/selectors";
import { networkEvents } from "../../../store/saga/upload-img-saga";
import { IMG_UPLOAD_DONE } from "../../../store/reducers/app-state.reducer";
import { useEffect } from "react";

const UploadButton = () => {
  const { loading, downloadLink } = useAppSelector(selectOutputImages);
  const { imgUploadDone, status } = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uploadObserver = (data: { uploadDone: boolean }) => {
      if (data.uploadDone) {
        dispatch(IMG_UPLOAD_DONE());
      }
    };
    networkEvents.on("upload", uploadObserver);
    return () => {
      networkEvents.off("upload", uploadObserver);
    };
  }, []);

  const handleDownload = () => downloadFile(downloadLink!);

  const currentCase =
    status === "fetched" ? "circulationDone" : "circulationNotDone";

  const cases = {
    circulationNotDone: (
      <CirculationNotDone
        type="submit"
        whileTap={{ scale: 0.97 }}
        disabled={loading}
        layout
        key="circulationNotDone"
      >
        <Progress id="upload-progress" $uploadDone={imgUploadDone} />
        {!loading ? (
          "Upload Selected Files"
        ) : imgUploadDone ? (
          "Upload is done"
        ) : (
          <LoadingText>
            <div>Uploading</div>
            <Oval
              height="20px"
              width="20px"
              color="#f7f7f7"
              wrapperStyle={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#000000c3"
              strokeWidth={4}
              strokeWidthSecondary={7}
            />
          </LoadingText>
        )}
      </CirculationNotDone>
    ),
    circulationDone: (
      <CirculationDone layout key="circulationDone">
        <div
          onClick={() => dispatch({ type: "RESET_STORE" })}
          title="do it one more time"
        >
          Again
          <BsArrowRepeat />
        </div>
        <div onClick={handleDownload} title="download as zip">
          Download
          <GoFileZip />
        </div>
      </CirculationDone>
    ),
  };

  return <AnimatePresence>{cases[currentCase]}</AnimatePresence>;
};

const LoadingText = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const variants: Variants = {
  initial: {
    y: +45,
    opacity: 0.2,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: +30,
    opacity: 0.3,
    transition: {
      duration: 0.4,
    },
  },
};

const CirculationDone = styled(motion.div).attrs({
  ...defaultVariant,
  variants,
})`
  background: black;
  color: white;
  display: flex;
  width: 250px;
  border-radius: 5px;
  margin: auto;
  margin-top: 30px;
  min-height: 22px;
  margin-bottom: 4rem;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    flex: 1;
    padding: 0.5rem 0.75rem;
    border-radius: 5px;
    &:hover {
      background-color: var(--color-light-green);
      color: black;
      transition: color 800ms ease-in-out;
    }
    cursor: pointer;
  }

  > div:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: 2px solid white;
  }

  > div:nth-child(2) {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const CirculationNotDone = styled(BtnDefault).attrs({
  ...defaultVariant,
  variants,
})`
  position: relative;
  &:disabled {
    border: 1px solid black;
    background-color: transparent;
    color: black;
    cursor: not-allowed;
  }
  text-align: center;
  display: block;
  width: 250px;
  margin: auto;
  margin-top: 30px;
  min-height: 22px;
`;

const Progress = styled(motion.div)<{ $uploadDone: boolean }>`
  width: 0;
  height: 100%;
  background-color: ${(props) => (props.$uploadDone ? "#c0dd1bc3" : "#d3d3d3")};
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all ease 600ms;
  border-radius: 5px;
`;

export default UploadButton;
