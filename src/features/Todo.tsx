import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import { List } from "@components/Todo/List";
import { Summary } from "@components/Todo/Summary";
import { Input } from "@components/Todo/input/Input";
import { CompletedList } from "@components/Todo/CompletedList";
import { editableAtom, NavState } from "@utils/atom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * 내일 -> 완료할 작업 갯수, summary 제거
 * 완료됨 -> 완료한 작업 갯수, summary 제거
 */
export const Todo = () => {
  const nav = useRecoilValue(NavState);
  const [editable, setEditable] = useRecoilState(editableAtom);

  const NavTodoInfo: React.FC = () => {
    const txt =
      nav.nav === "내일"
        ? `완료할 작업 ${nav.pendingCount}`
        : nav.nav === "완료됨"
        ? `완료한 작업 ${nav.completedCount}`
        : null;

    return <TodoInfo>{txt}</TodoInfo>;
  };

  // animation
  const variants = {
    init: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <Layout variants={variants} key={nav.nav} initial="init" animate="animate">
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
    </AnimatePresence>
  );
};

const Layout = styled(motion.div)`
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
