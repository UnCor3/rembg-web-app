import { UPLOAD_IMAGES_ACTION } from "../../store/reducers/output-images.reducer";
import FormErrorBoundary from "../error-boundaries/form-error-boundary";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import styled from "styled-components";
import { selectInputImages } from "../../store/selectors/selectors";
import { ImageType } from "../../types";
import { FC } from "react";

export type ImagesInitialType = {
  imgs: ImageType[];
  error: null | string;
  loading: boolean;
  downloadLink: null | string;
};

const RemBgForm: FC<{ children: React.ReactNode }> = ({ children }) => {
  const inputImages = useAppSelector(selectInputImages);
  const dispatch = useAppDispatch();

  const handleRemBg = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fileOrder = inputImages.imgs.map((img) => img.name);
    dispatch(
      UPLOAD_IMAGES_ACTION({
        fileOrder,
        form,
        progress: { showUploadProgressElm: "#upload-progress" },
      })
    );
  };

  return (
    <FormErrorBoundary>
      <Form onSubmit={handleRemBg}>{children}</Form>
    </FormErrorBoundary>
  );
};

//*STYLES
const Form = styled.form``;

export default RemBgForm;
