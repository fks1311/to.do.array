import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { NavItem } from "@model/Nav";
import { TodoItem } from "@model/locaStorage";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { Circle, CircleCheckBig, ChevronDown } from "lucide-react";
import { TodoCheckDown } from "./TodoCheckDown";
import { navKorToEngParsing } from "@utils/todoHelpers";
import { triggerAtom } from "@utils/atom";

interface OwnProps extends Pick<NavItem, "nav"> {}
export const List: React.FC<OwnProps> = ({ nav }) => {
  const getStorageTodos = getLocalStorage("todos");
  const day = navKorToEngParsing(nav);
  const [list, setList] = useState<TodoItem[]>([]); // 현재 nav의 할 일 목록
  const [complete, setComplete] = useState<TodoItem[]>(getStorageTodos?.completed ?? []); // 할 일 목록 완료 여부
  const [isOpen, setIsOpen] = useState<boolean[] | []>([]); // 상태변경(취소, 미루기, 삭제) 버튼 UI 활성화
  const trigger = useRecoilValue(triggerAtom);

  useEffect(() => {
    // todo list 렌더링
    setList(getStorageTodos[day]);

    // nav에 따라 Array.from 배열 생성(완료/미루기/취소 관련)
    const todos = getStorageTodos?.[day];
    const newIsOpenArray = Array.from({ length: todos?.length }, () => false);
    setIsOpen(newIsOpenArray);
  }, [nav, trigger]);

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
    let newLocalStorage = { ...getStorageTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [`${navKorToEngParsing(nav)}`]: filterArray,
      completed: updatedComplete,
    };
    setLocalStorage("todos", newLocalStorage);
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
              {todo.complete ? <CircleCheckBig size={20} color="#0B192C" /> : <Circle size={20} color="#3674B5" />}
              {todo.todo}
            </CheckTodo>
            <ChevronDown onClick={() => onClickOpen(idx)} />
            <TodoCheckDown idx={idx} nav={nav} isOpen={isOpen[idx]} />
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
