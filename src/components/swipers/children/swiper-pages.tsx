import { ImagesInitialType } from "../../rembg-form/rembg-form.component";
import { Oval } from "react-loader-spinner";
import { SwiperSlide } from "swiper/react";
import styled from "styled-components";
import Wrapper from "./wrapper";
import { FC } from "react";
//*Swiper.js-CSS
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperPages: FC<{
  data: ImagesInitialType;
  bg?: string;
  extra: { [key: string]: unknown };
}> = ({ data, extra, bg }) => {
  const { loading, imgs, error } = data;

  if (loading) {
    return (
      <Loading>
        <Oval
          height="25px"
          width="25px"
          color="#f7f7f7"
          wrapperStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#000000c3"
          strokeWidth={4}
          strokeWidthSecondary={7}
        />
        <div>Processing</div>
      </Loading>
    );
  }

  if (error) {
    //had a ui here
    //but it looked so bad that i removed
    //instead i throw the error so error boundary can catch it
    //kept this line bc i may add a new ui in future
    throw error;
  }

  return (
    <Wrapper
      settings={{
        navigation: {
          el: ".swiper-pagination-bullet",
          clickable: true,
        },
        ...extra,
        bg,
      }}
    >
      {imgs.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img.source} />
        </SwiperSlide>
      ))}
    </Wrapper>
  );
};
export default SwiperPages;

//*STYLES
const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: black;
  height: 100%;
  margin: auto;
  text-align: center;
`;
