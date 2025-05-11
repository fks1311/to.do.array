import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { List } from "@components/Todo/List";
import { Summary } from "@components/Todo/Summary";
import { Input } from "@components/Todo/input/Input";
import { CompletedList } from "@components/Todo/CompletedList";
import { NavState } from "@utils/atom";
import { EditableState } from "@model/stateTodo";

/**
 * 내일 -> 완료할 작업 갯수, summary 제거
 * 완료됨 -> 완료한 작업 갯수, summary 제거
 */
export const Todo = () => {
  const nav = useRecoilValue(NavState);
  const [editable, setEditable] = useState<EditableState>({ idx: null, isSelect: false });

  const NavTodoInfo: React.FC = () => {
    const txt =
      nav.nav === "내일"
        ? `완료할 작업 ${nav.pendingCount}`
        : nav.nav === "완료됨"
        ? `완료한 작업 ${nav.completedCount}`
        : null;

    return <TodoInfo>{txt}</TodoInfo>;
  };

  return (
    <Layout>
      <Title>
        {nav.nav}
        <NavTodoInfo />
      </Title>
      <Main>
        {nav.nav === "완료됨" ? (
          <CompletedList />
        ) : (
          <>
            <Summary nav={nav.nav} />
            <Input nav={nav.nav} editable={editable} setEditable={setEditable} />
            <List nav={nav.nav} editable={editable} setEditable={setEditable} />
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
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.8rem;
  font-size: 2rem;
  color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
`;
const TodoInfo = styled.p`
  font-size: 1rem;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1rem;
`;
