import styled from "styled-components";

export const Timer = () => {
  return <Layout>timer</Layout>;
};

const Layout = styled.div`
  flex: 0.4;
  border-right: 1px solid ${({ theme: { darkmode } }) => darkmode.divider};
`;
