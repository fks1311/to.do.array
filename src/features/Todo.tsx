import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { List } from "@components/Todo/List";
import { Summary } from "@components/Todo/Summary";
import { Input } from "@components/Todo/input/Input";
import { NavState } from "@utils/atom";
import { CompletedList } from "../components/Todo/CompletedList";

export const Todo = () => {
  const nav = useRecoilValue(NavState).nav;

  return (
    <Layout>
      <p id="sel">{nav}</p>
      <Main>
        {nav === "완료됨" ? (
          <CompletedList />
        ) : (
          <>
            <Summary nav={nav} />
            <Input nav={nav} />
            <List nav={nav} />
          </>
        )}
      </Main>
    </Layout>
  );
};

const Layout = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.5rem 2rem;
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
