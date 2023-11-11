import styled from "styled-components";

const _404 = () => {
  return (
    <Container>
      <h1>404 NOT FOUND</h1>
    </Container>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const Container = styled.div`
  position: absolute;
  top: 35%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default _404;
