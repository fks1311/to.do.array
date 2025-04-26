import styled from "styled-components";

export const Total = () => {
  return (
    <Layout>
      <Info>
        <Title>
          <Main>0</Main>
        </Title>
        <p>완료할 작업</p>
      </Info>
      <Info>
        <Title>
          <Main>0</Main>
          <span id="m">분</span>
        </Title>
        <p>완료한 시간</p>
      </Info>
      <Info>
        <Title>
          <Main>0</Main>
        </Title>
        <p>완료한 작업</p>
      </Info>
    </Layout>
  );
};

const Layout = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  border-radius: 3px;
  background-color: ${({ theme: { darkmode } }) => darkmode.bg_elevated};
`;
const Info = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  p {
    font-size: 0.7rem;
    color: ${({ theme: { darkmode } }) => darkmode.txt_secondary};
  }
`;
const Title = styled.div`
  #m {
    font-size: 0.7rem;
    color: ${({ theme: { darkmode } }) => darkmode.txt_secondary};
  }
`;
const Main = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme: { darkmode } }) => darkmode.main_color};
`;
