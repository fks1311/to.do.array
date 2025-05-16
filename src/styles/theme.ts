import { DefaultTheme } from "styled-components";

const breakpoints: DefaultTheme["breakpoints"] = {
  smaller: `479px`,
  mobile: `767px`,
  tablet: `1229px`,
  desktop: `1230px`,
};

const media: DefaultTheme["media"] = {
  smaller: `screen and (max-width: ${breakpoints.smaller})`,
  mobile: `screen and (max-width: ${breakpoints.mobile})`,
  tablet: `screen and (max-width: ${breakpoints.tablet})`,
  desktop: `screen and (min-width:${breakpoints.desktop})`,
};

const darkmode: DefaultTheme["darkmode"] = {
  bg: `#121214`,
  bg_elevated: `#9897A1`,
  divider: `#2C2C34`,
  main_color: `#1F4068`,
  txt_primary: `#F9F9FD`,
  txt_secondary: `#DADAE5`,
};

const theme = {
  breakpoints,
  media,
  darkmode,
};

export default theme;
