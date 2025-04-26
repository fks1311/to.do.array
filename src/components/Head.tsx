import styled from "styled-components";
import Logo from "@assets/icon.png";
import { JSX } from "react";

export const Header = (): JSX.Element => {
  return (
    <Head>
      <img src={Logo} />
      <p>to•do•focus</p>
    </Head>
  );
};

const Head = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 1rem;
  height: 15%;
  border-bottom: 1px solid ${({ theme: { darkmode } }) => darkmode.divider};
  img {
    height: 4rem;
    border-radius: 50%;
    margin-right: 30px;
  }
  p {
    font-size: 3rem;
    color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
  }
`;
