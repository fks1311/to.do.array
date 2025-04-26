import styled from "styled-components";

export const List = () => {
  return (
    <Layout>
      <p>할 일</p>
      <Content></Content>
    </Layout>
  );
};

const Layout = styled.div`
  p {
    color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
  }
`;

const Content = styled.div``;
