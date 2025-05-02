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

  const onCheckBoolean = (idx: number) => {
    // idx 객체 수정
    let newList = [...list];
    newList[idx] = {
      ...newList[idx],
      completed: !newList[idx].completed,
    };
    setList(newList);

    // 수정된 객체 요소 localStorage에 담을 객체
    let newObj = { ...getLocalTodos };
    newObj = {
      ...getLocalTodos,
      [`${navFilter(title)}`]: newList,
    };
    window.localStorage.setItem("todos", JSON.stringify(newObj));
  };

  return (
    <Layout>
      <p>할 일</p>
      <Content>
        {list?.map((todo, idx) => (
          <Todo key={idx} onClick={() => onCheckBoolean(idx)}>
            <CheckTodo>
              {todo.completed ? <CircleCheckBig size={20} color="#3F7D58" /> : <Circle size={20} color="#3674B5" />}
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
