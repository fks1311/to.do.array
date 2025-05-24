import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
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
 * App
 *
 * 1. init
 * 2. 하루 지남 체크(10분마다) -> 하루 지났을 경우, '오늘' 일정에 '기존 오늘' + '내일' 일정 합치기
 * 3. 속한 주 월요일 체크(하루마다) -> 일주일 지났을 경우 저번주 일정(오늘/내일/이번주/완료됨) 모두 초기화
 *
 */
function App() {
  const setTodos = useSetRecoilState(initTodosAtom);
  const resetEditable = useResetRecoilState(editableAtom);
  const getStorageTimer = getLocalStorage("timer");
  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  const [today, setToday] = useState(Today());
  const [week, setWeek] = useState(setStoreDate(Today())); // 오늘이면 안되고 월요일 날짜마다 저장

  // init
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    setLocalStorage("today", Today());
    if (!storedTodos) {
      setLocalStorage("todos", basic);
      setTodos(basic);
    } else {
      setTodos(JSON.parse(storedTodos));
    }
    resetEditable();
  }, [trigger]);

  // 일 / 주간 지남 체크
  useEffect(() => {
    const isToday = setInterval(() => {
      setToday(Today());
      setWeek(setStoreDate(Today()));
    }, 1000 * 60); // 1분마다 확인
    return () => clearInterval(isToday);
  }, []);

  // 하루 지남에 따른 todo 목록 등록 날짜 조정
  useEffect(() => {
    if (!isExpired(getLocalStorage("today"))) return;

    const getStorageTodos = getLocalStorage("todos");
    let todayAndTomorrowTodo = [...getStorageTodos.today, getStorageTodos.tomorrow].flat(); // 내일 할일 오늘 할일로 항목 합치기
    const updateDate = todayAndTomorrowTodo.map((data: {}, i: number) => {
      return { ...data, date: Today() };
    }); // 오늘 날짜로 변경

    // 일정 합치기
    const updateStorageTodos = {
      ...getStorageTodos,
      today: updateDate,
      tomorrow: [],
    };
    setLocalStorage("todos", updateStorageTodos);

    // 오늘 완료된 시간 초기화
    const updateStorageTimer = {
      ...getStorageTimer,
      today: 0,
    };

    setLocalStorage("timer", updateStorageTimer);
    setTrigger((prev) => prev + 1);
  }, [today]);

  // 일주일 지남에 따른 todo & timer 초기화
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
    const updateStorageTimer = {
      ...getStorageTimer,
      today: 0,
      weekend: 0,
    };
    setLocalStorage("timer", updateStorageTimer);
    setTrigger((prev) => prev + 1);
  }, [week]);

  return (
    <>
      <Modal />
      <Layout>
        <Header />
        <Main>
          <Nav />
          <Timer />
          <Todo />
        </Main>
      </Layout>
    </>
  );
}

export default App;

const Layout = styled.div`
  min-width: 600px;
  height: 100%;
  width: 100%;
`;
const Main = styled.main`
  height: 84%;
  display: flex;
  @media ${({ theme }) => theme.media.tablet} {
    display: flex;
    flex-direction: column;
  }
`;
