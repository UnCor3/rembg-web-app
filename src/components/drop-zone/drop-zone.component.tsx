import styled, { css } from "styled-components";
import { FC, useEffect, useRef } from "react";
import { secureImgInput } from "../../utils/secureImgInput";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ADD_VALID_INPUT_IMGS } from "../../store/reducers/input-images.reducer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectInputImages } from "../../store/selectors/selectors";
import { informError } from "../../lib/toastify";
import { laptop, tablet } from "../../lib/responsive";

const DropZone: FC<{
  imgInputRef: React.MutableRefObject<HTMLInputElement | null>;
}> = ({ imgInputRef }) => {
  const dispatch = useAppDispatch();
  const { imgs } = useAppSelector(selectInputImages);
  const uploadContainerRef = useRef<HTMLDivElement | null>(null);

  //*No need to rerun
  useEffect(() => {
    const dragOverHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer!.dropEffect = "copy";
      uploadContainerRef.current!.classList.add("active");
    };
    const dragLeaveEvenHandler = () =>
      uploadContainerRef.current!.classList.remove("active");

    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape")
        uploadContainerRef.current!.classList.remove("active");
    };

    if (window.File && window.FileList) {
      window.addEventListener("dragover", dragOverHandler);
      uploadContainerRef.current!.addEventListener(
        "dragleave",
        dragLeaveEvenHandler
      );
      window.addEventListener("keydown", keydownEvent);
    } else {
      informError("Your browser does not support drag and drop");
    }
    return () => {
      window.removeEventListener("dragover", dragOverHandler);
      uploadContainerRef.current &&
        uploadContainerRef.current.removeEventListener(
          "dragleave",
          dragLeaveEvenHandler
        );
      window.removeEventListener("keydown", keydownEvent);
    };
  }, []);

  //!We only need to rerun this useEffect
  //thats is why it is separated
  useEffect(() => {
    const dropEventHandler = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      uploadContainerRef.current!.classList.remove("active");
      if (!e.dataTransfer!.files || !imgInputRef.current) {
        return alert("Something went wrong");
      }

      if (imgs.length) {
        dispatch({ type: `RESET_STORE` });

        const { validFiles, validDataTransferFiles } = secureImgInput(
          e.dataTransfer!.files
        );
        imgInputRef.current!.files = validDataTransferFiles;

        dispatch(ADD_VALID_INPUT_IMGS(validFiles));
      } else {
        const { validFiles, validDataTransferFiles } = secureImgInput(
          e.dataTransfer!.files
        );
        imgInputRef.current!.files = validDataTransferFiles;
        dispatch(ADD_VALID_INPUT_IMGS(validFiles));
      }
    };

    if (window.File && window.FileList)
      document.body.addEventListener("drop", dropEventHandler);

    return () =>
      //!Removing event handlers
      document.body.removeEventListener("drop", dropEventHandler);
  }, [imgs]);

  return (
    <Container ref={uploadContainerRef}>
      <Column>
        <div></div>
        <div></div>
      </Column>
      <Column>
        <h1>DROP HERE</h1>
      </Column>
      <Column>
        <div></div>
        <div></div>
      </Column>
    </Container>
  );
};

const Column = styled.div``;

const heightAndWidth = css`
  width: 30vw;
  height: 20vh;
  ${tablet(css`
    width: 20vw;
    height: 20vh;
  `)}

  ${laptop(css`
    width: 12.5vw;
    height: 20vh;
  `)}
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #00000061;
  color: white;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: none;
  &.active {
    display: flex;
    flex-direction: column;
  }

  ${Column} {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  ${Column}:nth-child(1) {
    > div:first-child {
      border-top: 30px solid white;
      border-left: 30px solid white;
      ${heightAndWidth}
    }

    > div:nth-child(2) {
      border-top: 30px solid white;
      border-right: 30px solid white;
      ${heightAndWidth}
    }
  }

  ${Column}:nth-child(2) {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  ${Column}:nth-child(3) {
    > div:first-child {
      border-bottom: 30px solid white;
      border-left: 30px solid white;
      ${heightAndWidth}
    }

    > div:nth-child(2) {
      border-bottom: 30px solid white;
      border-right: 30px solid white;
      ${heightAndWidth}
    }
  }
`;

export default DropZone;
