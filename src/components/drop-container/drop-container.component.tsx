import { ADD_VALID_INPUT_IMGS } from "../../store/reducers/input-images.reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useRef } from "react";
import styled, { css } from "styled-components";
import {
  selectAppState,
  selectInputImages,
} from "../../store/selectors/selectors";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../hooks/useAppSelector";
import EditFiles from "../edit-files/edit-files.component";
import { secureImgInput } from "../../utils/secureImgInput";
import UploadSection from "./children/upload-section.component";
import { BiUpload } from "react-icons/bi";
import { laptop } from "../../lib/responsive";
import { defaultGesture } from "../../lib/framer-motion";
import { _3DBox, _3DBoxStyles } from "../3d-box/3d-box.component";
import DropZone from "../drop-zone/drop-zone.component";

const DropContainer = () => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const uploadSectionRef = useRef<HTMLInputElement | null>(null);
  const { imgs } = useAppSelector(selectInputImages);
  const { status } = useAppSelector(selectAppState);
  const handleImgInputClick = () => imgInputRef.current?.click();

  const dispatch = useAppDispatch();

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return alert("You must choose at least a file");

    const { validFiles, validDataTransferFiles } = secureImgInput(
      e.target.files
    );
    e.target.files = validDataTransferFiles;
    dispatch(ADD_VALID_INPUT_IMGS(validFiles));
  };

  const uploadSectionVariants = {
    initial: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  //!Render when idle and have no img inputs
  const render = status === "idle";

  //!Render when there are no img inputs
  const render3D = !imgs.length;
  return (
    <Container variants={uploadSectionVariants} initial="initial" exit="exit">
      <ImgInput
        type="file"
        multiple
        name="images"
        id="upload"
        onChange={handleImgInput}
        ref={imgInputRef}
      />
      <AnimatePresence>
        {render ? (
          <UploadSection
            handleImgInputClick={handleImgInputClick}
            uploadSectionRef={uploadSectionRef}
          >
            <_3DBoxTop $imgs={!!imgs.length}>
              <PlaceholderButton>
                <BiUpload style={{ fontSize: "1.3rem" }} />
                {!imgs.length ? "Upload Image(s)" : "Select More"}
              </PlaceholderButton>
              <Alternative>Or drop image(s)</Alternative>
            </_3DBoxTop>
            {render3D ? <_3DBox /> : null}
          </UploadSection>
        ) : null}
      </AnimatePresence>
      <DropZone imgInputRef={imgInputRef} />
      <UploadButtonAndFilesMap>
        <EditFiles imgs={imgs} ref={imgInputRef} />
      </UploadButtonAndFilesMap>
    </Container>
  );
};

const _3DBoxTop = styled.div<{ $imgs: boolean }>`
  position: ${(props) => (!props.$imgs ? "absolute" : "static")};
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover ~ ${_3DBox} {
    ${_3DBoxStyles}
  }
`;

const UploadButtonAndFilesMap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;

const ImgInput = styled.input`
  display: none;
`;

const PlaceholderButton = styled(motion.button).attrs({
  type: "button",
  ...defaultGesture,
})`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 1.5rem;
  font-weight: bolder;
  border: 1px solid black;
  background-color: black;
  color: white;
  &:focus {
    box-shadow: rgba(51, 133, 234, 0.5) 0px 0px 0px 0.2rem;
  }
  //*responsiveness
  ${laptop(css`
    gap: 0.2rem;
  `)}
`;

const Alternative = styled.span`
  display: none;
  //*responsiveness
  ${laptop(css`
    display: block;
  `)}
`;

const Container = motion(styled.div``);

export default DropContainer;
