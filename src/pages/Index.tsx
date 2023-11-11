import DropContainer from "../components/drop-container/drop-container.component";
import UploadButton from "../components/edit-files/children/upload-button";
import IOContainer from "../components/io-container/io-container.component";
import RemBgForm from "../components/rembg-form/rembg-form.component";
import Swipers from "../components/swipers/swipers.component";
import TestImages from "../components/test-images/test-images.component";
import Title from "../components/title/title.component";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  selectInputImages,
  selectOutputImages,
} from "../store/selectors/selectors";

const Index = () => {
  const inputImages = useAppSelector(selectInputImages);
  const outputImages = useAppSelector(selectOutputImages);

  return (
    <RemBgForm>
      <Title />
      <IOContainer>
        <Swipers input={inputImages} output={outputImages} />
      </IOContainer>
      <DropContainer />
      {inputImages.imgs.length ? <UploadButton /> : null}
      <TestImages />
    </RemBgForm>
  );
};

export default Index;
