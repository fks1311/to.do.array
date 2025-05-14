import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { Nav } from "@layout/Nav";
import { Header } from "@layout/Head";
import { Todo } from "@features/Todo";
import { Timer } from "@features/Timer";
import { Modal } from "@components/Timer/Modal";
import { basic } from "@model/locaStorage";
import { isExpired, setStoreDate, Today } from "@utils/date";
import { editableAtom, initTodosAtom, triggerAtom } from "@utils/atom";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";

/**
 * 일주일마다 초기화
 *
 * 1. 그 주의 월요일 구하기
 * 2. 그 주 월요일마다 저장
 * 2. 월요일 날짜 setStore
 * 3. 일주일 지났는지 확인 후 월요일 setting
 * 4. 하루마다 체크
 * 5. 일주일 지났으면 새로운 월요일 store
 */
function App() {
  const setTodos = useSetRecoilState(initTodosAtom);
  const resetEditable = useResetRecoilState(editableAtom);
  const trigger = useRecoilValue(triggerAtom);
  const [today, setToday] = useState(Today());
  const [week, setWeek] = useState(setStoreDate(Today())); // 오늘이면 안되고 월요일 날짜마다 저장

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

  // 하루 지남 체크
  useEffect(() => {
    const isToday = setInterval(() => {
      setToday(Today());
    }, 1000 * 60 * 10); // 10분마다 확인
    return clearInterval(isToday);
  }, []);

  // 속한 주의 월요일 체크
  useEffect(() => {
    const isWeek = setInterval(() => {
      setWeek(Today());
    }, 24 * 60 * 60 * 1000); // 하루마다 확인
    return clearInterval(isWeek);
  }, []);

  // 하루 지남에 따른 todo 목록 등록 날짜 조정
  useEffect(() => {
    if (!isExpired(today)) return;
    const getStorageTodos = getLocalStorage("todos");
    let todayAndTomorrowTodo = [...getStorageTodos.today, getStorageTodos.tomorrow].flat(); // 내일 할일 오늘 할일로 항목 합치기
    const updateDate = todayAndTomorrowTodo.map((data: {}, i: number) => {
      return { ...data, date: Today() };
    }); // 오늘 날짜로 변경

    const updateStorageTodos = {
      ...getStorageTodos,
      today: updateDate,
      tomorrow: [],
    };
    setLocalStorage("todos", updateStorageTodos);
  }, [today]);

  // 일주일 지남에 따른 todo 초기화
  // 이번주 넘기고, 저번주면 초기화
  useEffect(() => {
    const isLastWeek = new Date(Today()) > new Date(week);
    if (isLastWeek) return;
    const initWeek = {
      today: [],
      tomorrow: [],
      week: [],
      completed: [],
    };
    setLocalStorage("todos", initWeek);
  }, [week]);

  // 해당 주 월요일 계속 체크
  // 해당 주 월요일보다 오늘 날짜가 작으면 저번주 , 아니면 이번주

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
