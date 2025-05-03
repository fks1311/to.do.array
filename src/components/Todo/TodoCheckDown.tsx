import React from "react";
import styled from "styled-components";

import { X, ArrowRightToLine, Trash2 } from "lucide-react";
import { navKorToEngParsing, titleLocalTodos } from "@utils/todoHelpers";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { useSetRecoilState } from "recoil";
import { triggerAtom } from "@utils/atom";

interface OepnType {
  idx: number;
  title: string;
  open?: boolean;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean[] | []>>;
}

export const TodoCheckDown: React.FC<OepnType> = ({ idx, title, isOpen }) => {
  const getStorageTodos = getLocalStorage("todos");
  const getTitleStorageTodos = titleLocalTodos(title);
  const setTrigger = useSetRecoilState(triggerAtom);
  const removeAtIndex = (idx: number) => {
    return getTitleStorageTodos.filter((_: any, i: number) => i !== idx);
  };

  const onCancel = (idx: number) => {
    getTitleStorageTodos[idx].complete = true;
    const remainingTodos = removeAtIndex(idx);

    let newLocalStorage = { ...getStorageTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [navKorToEngParsing(title)]: remainingTodos,
      [`completed`]: [...newLocalStorage.completed, getTitleStorageTodos[idx]],
    };

    setLocalStorage("todos", newLocalStorage);
    setTrigger((prev) => prev + 1);
  };

  const onDelay = (idx: number) => {
    const remainingTodos = removeAtIndex(idx);

    let newLocalStorage = { ...getStorageTodos };
    let tomorrow = [...newLocalStorage.tomorrow, getTitleStorageTodos[idx]];
    let week = [...newLocalStorage.week, getTitleStorageTodos[idx]];
    newLocalStorage = {
      ...newLocalStorage,
      [navKorToEngParsing(title)]: remainingTodos,
      [title === "오늘" ? `tomorrow` : `week`]: title === "오늘" ? tomorrow : week,
    };

    setLocalStorage("todos", newLocalStorage);
    setTrigger((prev) => prev + 1);
  };

  const onDelete = (idx: number) => {
    const remainingTodos = removeAtIndex(idx);

    let newLocalStorage = { ...getStorageTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [navKorToEngParsing(title)]: remainingTodos,
    };

    setLocalStorage("todos", newLocalStorage);
    setTrigger((prev) => prev + 1);
  };

  return (
    <>
      {isOpen && (
        <Layout>
          <li onClick={() => onCancel(idx)}>
            <X size={20} />
            취소
          </li>
          {title !== "이번주" && (
            <li onClick={() => onDelay(idx)}>
              <ArrowRightToLine size={20} />
              미루기
            </li>
          )}
          <li onClick={() => onDelete(idx)}>
            <Trash2 size={20} />
            삭제
          </li>
        </Layout>
      )}
    </>
  );
};

const Layout = styled.ul`
  position: absolute;
  right: 1rem;
  z-index: 1;
  top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  li {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    padding: 0.5rem;
  }
  &:hover {
  }
`;
