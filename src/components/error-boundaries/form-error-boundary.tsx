import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import styled, { css } from "styled-components";
import { FC } from "react";
import { BtnDefault } from "../button/button.component";
import { laptop, tablet } from "../../lib/responsive";

const FormErrorFallback = () => {
  const { resetBoundary } = useErrorBoundary();
  const dispatch = useAppDispatch();
  return (
    <StyledFormPageFallback>
      <b>
        Something went wrong most likely due to server connection issues please
        try again later
      </b>
      <CustomBtn
        onClick={() => {
          resetBoundary();
          dispatch({ type: "RESET_STORE" });
        }}
      >
        Try again
      </CustomBtn>
    </StyledFormPageFallback>
  );
};

const FormErrorBoundary: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<FormErrorFallback />}>{children}</ErrorBoundary>
  );
};

export default FormErrorBoundary;

const CustomBtn = styled(BtnDefault)`
  width: fit-content;
  margin: auto;
  margin-top: 4rem;
  padding: 1rem;
`;

const StyledFormPageFallback = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  text-align: center;

  ${tablet(css`
    font-size: 1.3rem;
  `)}

  ${laptop(css`
    font-size: 1.5rem;
  `)}
`;
