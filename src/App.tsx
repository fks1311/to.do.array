import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { Header } from "@components/Head";
import { Nav } from "@components/Nav";
import { Timer } from "@components/Timer/Timer";
import { Todo } from "@components/Todo/Todo";
import { basic } from "@model/locaStorage";
import { initTodosAtom, triggerAtom } from "@utils/atom";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { isDateExpired, Today } from "@utils/date";

function App() {
  const setTodos = useSetRecoilState(initTodosAtom);
  const trigger = useRecoilValue(triggerAtom);
  // true 지남 false 오늘
  const expired = isDateExpired(Today());

  // init
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) {
      setLocalStorage("todos", basic);
      setTodos(basic);
    } else {
      setTodos(JSON.parse(storedTodos));
    }
  }, [trigger]);

  // 하루 지남에 따른 todo 목록 등록 날짜 조정
  // 내일 할 일 -> 오늘 할 일 이동
  // 내일 날짜 -> 오늘 날짜로 변경
  useEffect(() => {
    const getStorageTodos = getLocalStorage("todos");
    let flatToday = [...getStorageTodos.today, getStorageTodos.tomorrow].flat(); // 내일 할일 오늘 할일로 항목 합치기
    const updateDate = flatToday.map((data, i: number) => {
      return { ...data, date: Today() };
    }); // 오늘 날짜로 변경

    const updateStorageTodos = {
      ...getStorageTodos,
      today: updateDate,
      tomorrow: [],
    };
    setLocalStorage("todos", updateStorageTodos);
  }, [expired === true]);

  return (
    <Layout>
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
`;
const Main = styled.main`
  height: 84%;
  display: flex;
`;
