import React from "react";
import styled from "styled-components";

import { X, ArrowRightToLine, Trash2 } from "lucide-react";
import { navEngParsing, titleLocalTodos } from "@utils/todoHelpers";
import { getLocalStorage } from "@utils/localStorage";

interface OepnType {
  idx: number;
  title: string;
  open?: boolean;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean[] | []>>;
}

export const TodoCheckDown: React.FC<OepnType> = ({ idx, title, isOpen }) => {
  const getLocalTodos = getLocalStorage("todos");
  const getTitleLocalTodos = titleLocalTodos(title);

  const onCancel = (idx: number) => {
    getTitleLocalTodos[idx].complete = true;
    const filtering = getTitleLocalTodos.filter((_: any, i: number) => i !== idx);

    let newLocalStorage = { ...getLocalTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [navEngParsing(title)]: filtering,
      [`completed`]: [...newLocalStorage.completed, getTitleLocalTodos[idx]],
    };

    localStorage.setItem("todos", JSON.stringify(newLocalStorage));
  };
  const onDelay = (idx: number) => {
    const filtering = getTitleLocalTodos.filter((_: any, i: number) => i !== idx);

    let newLocalStorage = { ...getLocalTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [navEngParsing(title)]: filtering,
      [`tomorrow`]: [...newLocalStorage.tomorrow, getTitleLocalTodos[idx]],
    };

    localStorage.setItem("todos", JSON.stringify(newLocalStorage));
  };
  const onDelete = (idx: number) => {
    const filtering = getTitleLocalTodos.filter((_: any, i: number) => i !== idx);

    let newLocalStorage = { ...getLocalTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [navEngParsing(title)]: filtering,
    };

    localStorage.setItem("todos", JSON.stringify(newLocalStorage));
  };

  return (
    <>
      {isOpen && (
        <Layout>
          <li onClick={() => onCancel(idx)}>
            <X size={20} />
            취소
          </li>
          <li onClick={() => onDelay(idx)}>
            <ArrowRightToLine size={20} />
            미루기
          </li>
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
