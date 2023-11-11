import styled, { css } from "styled-components";
import { laptop } from "../../lib/responsive";
import HamMenu from "../ham-menu/ham-menu.component";
import { AiFillGithub } from "react-icons/ai";
import { GITHUB_PROFILE } from "../../constants/constants";

const Navbar = () => {
  return (
    <Wrapper>
      <Container>
        <Left>
          <Brand>
            <a href="/">Remove.io</a>
          </Brand>
        </Left>
        <Right>
          <HamMenu />
          <Github />
        </Right>
      </Container>
    </Wrapper>
  );
};

const Github = () => (
  <a target="_blank" href={GITHUB_PROFILE}>
    <GithubIcon />
  </a>
);
const GithubIcon = styled(AiFillGithub)`
  display: none;
  cursor: pointer;
  ${laptop(css`
    display: block;
    font-size: 1.5rem;
  `)}
`;

//*STYLES
const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
`;

const Brand = styled.div`
  font-size: 1.35rem;
  font-weight: bolder;
`;

const Left = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Container = styled.div`
  max-width: 1500px;
  color: black;
  padding: 0 0.5rem;
  display: flex;
  margin: auto;
  position: relative;
  > * {
    flex: 1;
  }
  margin-bottom: 30px;
  ${laptop(css`
    padding: 1rem 0.5rem;
    height: 70px;
  `)}
`;

export default Navbar;
