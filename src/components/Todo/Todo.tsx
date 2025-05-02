import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { List } from "@components/Todo/List";
import { Summary } from "@components/Todo/Summary";
import { Input } from "@components/Todo/Input";
import { NavState } from "@utils/atom";

export const Todo = () => {
  const title = useRecoilValue(NavState).day;

  return (
    <Layout>
      <p id="sel">{title}</p>
      <Main>
        <Summary />
        <Input title={title} />
        <List title={title} />
      </Main>
    </Layout>
  );
};

const Layout = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  #sel {
    font-size: 2rem;
    color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
