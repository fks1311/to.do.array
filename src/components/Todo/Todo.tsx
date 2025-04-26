import styled from "styled-components";

import { Input } from "./Input";
import { List } from "./List";
import { Summary } from "./Summary";

type Nav = "오늘" | "내일" | "이번주" | "완료됨";

export const Todo = () => {
  return (
    <Layout>
      <p id="sel">오늘</p>
      <Main>
        <Summary />
        <Input />
        <List />
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
  gap: 1rem;
`;
