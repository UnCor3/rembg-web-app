import { css } from "styled-components";
import { ResponsiveCss } from "../types";

export function mobile(style: ResponsiveCss) {
  return css`
    @media all and (min-width: 250px) {
      ${
        //@ts-ignore
        style
      }
    }
  `;
}

export function tablet(style: ResponsiveCss) {
  return css`
    @media all and (min-width: 768px) {
      ${
        //@ts-ignore
        style
      }
    }
  `;
}

export function laptop(style: ResponsiveCss) {
  return css`
    @media all and (min-width: 1024px) {
      ${
        //@ts-ignore
        style
      }
    }
  `;
}

export function laptopL(style: ResponsiveCss) {
  return css`
    @media all and (min-width: 1300px) {
      ${
        //@ts-ignore
        style
      }
    }
  `;
}
