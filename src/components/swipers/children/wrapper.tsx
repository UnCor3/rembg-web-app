import { Swiper } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Controller, Thumbs } from "swiper/modules";
import styled, { css } from "styled-components";
import { FC } from "react";
import { laptop } from "../../../lib/responsive";

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

const Wrapper: FC<{
  children: React.ReactNode;
  settings: object;
  bg?: string;
}> = ({ children, settings, bg }) => {
  const sliderOptions = {
    slidesPerView: 1,
    pagination: true,
    navigation: true,
    loop: true,
    ...settings,
  };

  return (
    <SwiperWrapper
      $dots={sliderOptions?.pagination}
      $arrows={sliderOptions?.navigation}
      $bg={bg}
    >
      <Swiper
        {...sliderOptions}
        updateOnWindowResize={true}
        observer={true}
        observeParents={true}
      >
        {children}
      </Swiper>
    </SwiperWrapper>
  );
};

export default Wrapper;

const SwiperWrapper = styled.div<{
  $arrows: boolean;
  $dots: boolean;
  $bg: string | undefined;
}>`
  position: relative;
  cursor: zoom-in;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ${({ $arrows }) =>
    $arrows &&
    css`
      .swiper-button {
        &-next,
        &-prev {
          top: 50%;
          z-index: 9;
          width: 40px;
          height: 40px;
          margin: auto;
          line-height: 40px;
          position: absolute;
          visibility: hidden;
          text-align: center;
          transform: translateY(-50%);
          color: #000000;
          transition: all 0.4s ease 0s;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 3px 25.5px 4.5px rgba(0, 0, 0, 0.06);
          &:hover {
            color: #212121;
            background-color: #88a9b7;
          }
          &:after {
            font-size: 14px;
          }
        }
        &-prev {
          outline: 0;
          right: auto;
          left: -20px;
          &:after {
            margin-right: 3px;
          }
        }
        &-next {
          outline: 0;
          left: auto;
          right: -20px;
          &:after {
            margin-left: 3px;
          }
        }
        &-disabled {
          opacity: 0.1;
        }
      }

      &:hover {
        .swiper-button {
          &-prev,
          &-next {
            visibility: visible;
          }
          &-prev {
            left: 10px;
          }
          &-next {
            right: 10px;
          }
        }
      }
    `}
  ${({ $dots }) =>
    $dots &&
    css`
      .swiper-pagination {
        &-bullet {
          cursor: pointer;
          width: 17px;
          height: 17px;
          display: inline-block;
          border-radius: 50%;
          background: #c2d2d8;
          opacity: 0.5;
          border: 1px solid #88a9b7;
          margin: 0 5px;
          box-shadow: none;
          transition: all 0.4s ease 0s;
          transform: scale(0.8);
          ${laptop(css`
            width: 13px;
            height: 13px;
          `)}
          pointer-events: all !important;
          &:hover,
          &-active {
            background-color: #e2e9ec;
            border-color: black;
            transform: scale(1);
            opacity: 1;
            pointer-events: all !important;
          }
        }
      }
    `};
`;
