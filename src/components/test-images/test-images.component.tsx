import styled from "styled-components";
import { VITE_PUBLIC_URL } from "../../constants/constants";
import { informError } from "../../lib/toastify";
import { ADD_VALID_INPUT_IMGS } from "../../store/reducers/input-images.reducer";
import { UPLOAD_IMAGES_ACTION } from "../../store/reducers/output-images.reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectAppState,
  selectInputImages,
} from "../../store/selectors/selectors";

const testImgData = [
  "test-images/gamepad.jpg",
  "test-images/portrait.webp",
  "test-images/car.jpg",
];
const TestImages = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectAppState);
  const { imgs } = useAppSelector(selectInputImages);

  const handleTestImg = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    //@ts-ignore
    const imgSrc = e.target.getAttribute("src") as string;
    const name = imgSrc.split("/")[1];

    if (!imgSrc) return informError("Something went wrong");

    const url = VITE_PUBLIC_URL + "/" + imgSrc;
    const res = await fetch(url);
    const img = await res.blob();
    const fileOrder = [name];
    const form = new FormData();
    form.append("images", img, name);
    //! 2 STEPS TO WORK
    //*reason for this is confirmation button
    //*but here we are skipping the confirmation
    //*because it's just test imgs
    dispatch(
      ADD_VALID_INPUT_IMGS([{ name, source: URL.createObjectURL(img) }])
    );
    dispatch(
      UPLOAD_IMAGES_ACTION({
        fileOrder,
        form,
        progress: { showUploadProgressElm: "#upload-progress" },
      })
    );
  };

  //!Render only when no img inputs and status of idle
  const render = status === "idle" && !imgs.length;

  return (
    <>
      {render ? (
        <Container>
          <Text>
            <p>No images ?</p>
            <p>Pick one..</p>
          </Text>
          <Images>
            {testImgData.map((i) => (
              <ImageContainer onClick={handleTestImg} key={i}>
                <img src={i} alt="test-images" />
              </ImageContainer>
            ))}
          </Images>
        </Container>
      ) : null}
    </>
  );
};

export default TestImages;

const Container = styled.div`
  width: 60%;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #4a4949;
  justify-content: space-between;
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
`;

const Images = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ImageContainer = styled.div`
  width: 70px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: all ease 400ms;
  &:hover {
    scale: 1.1;
  }
  > img {
    width: 100%;
  }
`;
