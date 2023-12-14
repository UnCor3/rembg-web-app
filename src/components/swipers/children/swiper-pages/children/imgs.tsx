import { FC, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { ImageType } from "../../../../../types";
import styled from "styled-components";
type ImgsProps = {
  imgs: ImageType[];
};

const Imgs: FC<ImgsProps> = ({ imgs }) => {
  useEffect(() => {
    //meaning that we are on mobile
    if (window.innerWidth < 1023) return;
    let mouseMoveListener: (e: Event) => void;
    let mouseLeaveListener: (e: Event) => void;

    document.querySelectorAll(".slider-pic").forEach((img) => {
      mouseMoveListener = (e) => {
        const mouseEvent = e as MouseEvent;
        const container = e.currentTarget as HTMLElement;
        const img = (e.currentTarget as HTMLElement).children[0] as HTMLElement;
        const rect = container.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;

        img.style.transition = "none";
        img.style.transformOrigin = `${x}px ${y}px`;
        img.style.transform = "scale(2)";
      };

      mouseLeaveListener = (e) => {
        const element = (e.currentTarget as HTMLElement)
          .children[0] as HTMLElement;
        element.style.transition = "transform 0.5s ease";
        element.style.transform = "scale(1)";
      };

      img.addEventListener("mousemove", mouseMoveListener);
      img.addEventListener("mouseleave", mouseLeaveListener);
    });
    return () => {
      document.querySelectorAll(".slider-pic").forEach((img) => {
        img.removeEventListener("mousemove", mouseMoveListener);
        img.removeEventListener("mouseleave", mouseLeaveListener);
      });
    };
  }, []);

  return (
    <>
      {imgs.map((img, i) => (
        <SwiperSlide key={img.name}>
          <ImgContainer className="slider-pic">
            <img src={img.source} alt="img" key={i} />
          </ImgContainer>
        </SwiperSlide>
      ))}
    </>
  );
};

const ImgContainer = styled.div`
  background-image: url(./png-bg.jpg);
  width: 100%;
  height: 100%;
  display: flex;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
Imgs.displayName = "SwiperSlide";

export default Imgs;
