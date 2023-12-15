import { FC, useEffect, MouseEvent, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { ImageType } from "../../../../../types";
import styled from "styled-components";
import useResize from "../../../../../hooks/useSize";

type ImgsProps = {
  imgs: ImageType[];
};

const Imgs: FC<ImgsProps> = ({ imgs }) => {
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const { listenToResize } = useResize();

  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as unknown as MouseEvent;
      const container = e.currentTarget as HTMLElement;
      const img = (e.currentTarget as HTMLElement).children[0] as HTMLElement;
      const rect = container.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;

      img.style.transition = "none";
      img.style.transformOrigin = `${x}px ${y}px`;
      img.style.transform = "scale(2)";
    };

    const handleMouseLeave = (e: Event, transition = true) => {
      const element = (e.currentTarget as HTMLElement)
        .children[0] as HTMLElement;
      element.style.transition = transition ? "transform 0.5s ease" : "none";
      element.style.transform = "scale(1)";
      setZoomEnabled(false);
    };
    const disableZoom = (e: Event) => {
      //toggle img zooming
      setZoomEnabled(false);
      handleMouseLeave(e, false);
    };
    const enableZoom = (e: Event) => {
      handleMouseMove(e);
      setZoomEnabled(true);
    };

    //mobile
    if (window.innerWidth < 1023)
      return () => {
        //remove all
        document.querySelectorAll(".slider-pic").forEach((img) => {
          img.removeEventListener("mousemove", handleMouseMove);
          img.removeEventListener("mouseleave", handleMouseLeave);
          img.removeEventListener("click", disableZoom);
          img.removeEventListener("click", enableZoom);
        });
      };

    if (zoomEnabled) {
      document.querySelectorAll(".slider-pic").forEach((img) => {
        img.addEventListener("click", disableZoom);
        img.addEventListener("mousemove", handleMouseMove);
        img.addEventListener("mouseleave", handleMouseLeave);
        1;
      });
    } else {
      //only add enable zoom
      document.querySelectorAll(".slider-pic").forEach((img) => {
        img.addEventListener("click", enableZoom);
      });
    }
    return () => {
      //remove all
      document.querySelectorAll(".slider-pic").forEach((img) => {
        img.removeEventListener("mousemove", handleMouseMove);
        img.removeEventListener("mouseleave", handleMouseLeave);
        img.removeEventListener("click", disableZoom);
        img.removeEventListener("click", enableZoom);
      });
    };
  }, [zoomEnabled, listenToResize]);
  //add the set state to the exact img
  return (
    <>
      {imgs.map((img, i) => (
        <SwiperSlide key={img.name}>
          <ImgContainer className="slider-pic" $zoomEnabled={zoomEnabled}>
            <img src={img.source} alt="img" key={i} />
          </ImgContainer>
        </SwiperSlide>
      ))}
    </>
  );
};

const ImgContainer = styled.div<{ $zoomEnabled?: boolean }>`
  cursor: ${({ $zoomEnabled }) => ($zoomEnabled ? "zoom-out" : "zoom-in")};
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
