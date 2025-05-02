import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { NavItem } from "@model/Nav";
import { TodoItem } from "@model/locaStorage";
import { getLocalStorage } from "@utils/localStorage";
import { Circle, CircleCheckBig, ChevronDown } from "lucide-react";
import { TodoCheckDown } from "./TodoCheckDown";
import { navEngParsing } from "@utils/todoHelpers";

interface OwnProps extends Pick<NavItem, "title"> {}
export const List: React.FC<OwnProps> = ({ title }) => {
  const getLocalTodos = getLocalStorage("todos");
  const day = navEngParsing(title);
  const [list, setList] = useState<TodoItem[]>([]);
  const [complete, setComplete] = useState<TodoItem[]>(getLocalTodos?.completed ?? []);
  const [isOpen, setIsOpen] = useState<boolean[] | []>([]);

  useEffect(() => {
    // todo list 렌더링
    setList(getLocalTodos[day]);

    // title에 따라 Array.from 배열 생성(완료/미루기/취소 관련)
    const todos = getLocalTodos?.[day];
    const newIsOpenArray = Array.from({ length: todos.length }, () => false);
    setIsOpen(newIsOpenArray);
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
      [`${navEngParsing(title)}`]: filterArray,
      completed: updatedComplete,
    };
    localStorage.setItem("todos", JSON.stringify(newLocalStorage));
  };

  const onClickOpen = (idx: number) => {
    setIsOpen((prev) => {
      const newOpen = [...prev];
      newOpen[idx] = !newOpen[idx];
      return newOpen;
    });
  };

  return (
    <Layout>
      <p>할 일</p>
      <Content>
        {list?.map((todo, idx) => (
          <Todo key={idx}>
            <CheckTodo onClick={() => onCompleted(idx)}>
              {todo.complete ? <CircleCheckBig size={20} color="#3F7D58" /> : <Circle size={20} color="#3674B5" />}
              {todo.todo}
            </CheckTodo>
            <ChevronDown onClick={() => onClickOpen(idx)} />
            <TodoCheckDown idx={idx} title={title} isOpen={isOpen[idx]} />
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
  position: relative;
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
