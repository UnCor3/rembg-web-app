import styled, { css } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import { FC } from "react";
import { laptop, tablet } from "../../lib/responsive";

const CriticalErrorBoundaryFallback = () => {
  setTimeout(() => {
    document.location.reload();
  }, 3000);
  return (
    <StyledCriticalError>
      <p>A critical error has accorded ,refreshing...</p>
    </StyledCriticalError>
  );
};

const CriticalErrorBoundary: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ErrorBoundary fallback={<CriticalErrorBoundaryFallback />}>
      {children}
    </ErrorBoundary>
  );
};

export default CriticalErrorBoundary;

const StyledCriticalError = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 1500px;
  margin: auto;
  display: flex;
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
