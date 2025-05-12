import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { Header } from "layout/Head";
import { Nav } from "layout/Nav";
import { Todo } from "features/Todo";
import { basic } from "@model/locaStorage";
import { editableAtom, initTodosAtom, triggerAtom } from "@utils/atom";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { isDateExpired, Today } from "@utils/date";
import { Timer } from "features/Timer";
import { Modal } from "@components/Timer/Modal";

function App() {
  const setTodos = useSetRecoilState(initTodosAtom);
  const resetEditable = useResetRecoilState(editableAtom);
  const trigger = useRecoilValue(triggerAtom);
  const expired = isDateExpired(Today()); // true 지남 false 오늘

  // init
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) {
      setLocalStorage("todos", basic);
      setTodos(basic);
    } else {
      setTodos(JSON.parse(storedTodos));
    }
    resetEditable();
  }, [trigger]);

  // 하루 지남에 따른 todo 목록 등록 날짜 조정
  // useEffect(() => {
  //   const getStorageTodos = getLocalStorage("todos");
  //   let todayAndTomorrowTodo = [...getStorageTodos.today, getStorageTodos.tomorrow].flat(); // 내일 할일 오늘 할일로 항목 합치기
  //   const updateDate = todayAndTomorrowTodo.map((data: {}, i: number) => {
  //     return { ...data, date: Today() };
  //   }); // 오늘 날짜로 변경

  //   const updateStorageTodos = {
  //     ...getStorageTodos,
  //     today: updateDate,
  //     tomorrow: [],
  //   };
  //   setLocalStorage("todos", updateStorageTodos);
  // }, [expired]);

  return (
    <Layout>
      <Modal />
      <Header />
      <Main>
        <Nav />
        <Timer />
        <Todo />
      </Main>
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  height: 100%;
  width: 100%;
`;
const Main = styled.main`
  height: 84%;
  display: flex;
`;
