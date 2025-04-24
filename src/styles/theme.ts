import { DefaultTheme } from "styled-components";

const breakpoints: DefaultTheme["breakpoints"] = {
  smaller: `479px`,
  mobile: `767px`,
  tablet: `1023px`,
  desktop: `1024px`,
};

const media: DefaultTheme["media"] = {
  smaller: `screen and (max-width: ${breakpoints.smaller})`,
  mobile: `screen and (max-width: ${breakpoints.mobile})`,
  tablet: `screen and (max-width: ${breakpoints.tablet})`,
  desktop: `screen and (min-width:${breakpoints.desktop})`,
};

const theme: DefaultTheme = {
  breakpoints,
  media,
};

export default theme;
