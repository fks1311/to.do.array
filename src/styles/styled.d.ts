import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      smaller: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
    media: {
      smaller: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
    darkmode: {
      bg: string;
      bg_elevated: string;
      divider: string;
      main_color: string;
      txt_primary: string;
      txt_secondary: string;
    };
  }
}
