import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { NavItem } from "@model/Nav";
import { TodoItem } from "@model/locaStorage";
import { getLocalStorage } from "@utils/localStorage";
import { Circle, CircleCheckBig, ChevronDown } from "lucide-react";

interface OwnProps extends Pick<NavItem, "title"> {}
export const List: React.FC<OwnProps> = ({ title }) => {
  const getLocalTodos = getLocalStorage("todos");
  const [list, setList] = useState<TodoItem[]>([]);
  const [complete, setComplete] = useState<TodoItem[]>(getLocalTodos?.completed ?? []);
  const navFilter = (title: string) => {
    switch (title) {
      case "오늘":
        return "today";
      case "내일":
        return "tomorrow";
      case "이번주":
        return "week";
      default:
        return "today";
    }
  };

  useEffect(() => {
    const day = navFilter(title);
    setList(getLocalTodos[day]);
  }, [title]);

  const onCompleted = (idx: number) => {
    // 선택된 객체 제외한 나머지 할 일 목록
    let filterArray = list.filter((_, i) => i !== idx);
    setList(filterArray);

    // 상태 변경(완료, 취소, 미루기) 배열 목록
    const updatedComplete = [
      ...complete,
      (list[idx] = {
        ...list[idx],
        complete: !list[idx].complete,
      }),
    ];
    setComplete(updatedComplete);

    // 상태 변경 객체 요소 completed로 옮기기
    let newLocalStorage = { ...getLocalTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [`${navFilter(title)}`]: filterArray,
      completed: updatedComplete,
    };
    localStorage.setItem("todos", JSON.stringify(newLocalStorage));
  };

  return (
    <Layout>
      <p>할 일</p>
      <Content>
        {list?.map((todo, idx) => (
          <Todo key={idx} onClick={() => onCompleted(idx)}>
            <CheckTodo>
              {todo.complete ? <CircleCheckBig size={20} color="#3F7D58" /> : <Circle size={20} color="#3674B5" />}
              {todo.todo}
            </CheckTodo>
            <ChevronDown />
          </Todo>
        ))}
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  p {
    color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem 1rem 10px;
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
`;
const CheckTodo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
