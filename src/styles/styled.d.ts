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
  }
}
