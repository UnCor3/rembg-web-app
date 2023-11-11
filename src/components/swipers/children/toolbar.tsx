import { useDispatch, useSelector } from "react-redux";
import { selectAppState } from "../../../store/selectors/selectors";
import styled, { css } from "styled-components";
import { tablet } from "../../../lib/responsive";
import { RiDivideFill } from "react-icons/ri";
import { SET_IMGS_DISPLAYED_ON_ROW } from "../../../store/reducers/app-state.reducer";

const ToolBar = () => {
  const dispatch = useDispatch();
  const { imgsDisplayedOnRow } = useSelector(selectAppState);

  const handleSwitchToColumns = () =>
    dispatch(SET_IMGS_DISPLAYED_ON_ROW(!imgsDisplayedOnRow));

  const titleContent = imgsDisplayedOnRow
    ? "Switch to columns"
    : "Switch to row";

  return (
    <ToolBarContainer>
      <div title={titleContent} onClick={handleSwitchToColumns}>
        <RiDivideFill
          style={{
            rotate: !imgsDisplayedOnRow ? "90deg" : null,
            transition: "all ease 400ms",
          }}
        />
      </div>
    </ToolBarContainer>
  );
};

export default ToolBar;

//*STYLES
const ToolBarContainer = styled.div`
  display: none;
  ${tablet(css`
    display: flex;
    flex-direction: column;
    > * {
      padding: 1rem;
      cursor: pointer;
    }
    > *:hover {
      background-color: black;
      color: white;
    }
  `)}
`;
