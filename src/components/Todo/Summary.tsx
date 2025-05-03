import { NavItem } from "@model/Nav";
import { NavState } from "@utils/atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { navLocalTodos } from "@utils/todoHelpers";

interface OwnProps extends Pick<NavItem, "nav"> {}
export const Summary: React.FC<OwnProps> = ({ nav }) => {
  const curNav = useRecoilValue(NavState);

  return (
    <Layout>
      {curNav.nav !== "완료됨" && (
        <Info>
          <Title>
            <Main>{curNav.pendingCount}</Main>
          </Title>
          <p>완료할 작업</p>
        </Info>
      )}
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
  display: flex;
  align-items: center;
  padding: 1.5rem 0.3rem;
  border-radius: 3px;
  background-color: #eeeeee;
`;
const Info = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  p {
    font-size: 0.7rem;
    color: ${({ theme: { darkmode } }) => darkmode.main_color};
  }
`;
const Title = styled.div`
  #m {
    font-size: 0.7rem;
    color: ${({ theme: { darkmode } }) => darkmode.main_color};
  }
`;
const Main = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme: { darkmode } }) => darkmode.main_color};
`;
