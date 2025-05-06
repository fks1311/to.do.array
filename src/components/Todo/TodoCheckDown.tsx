import React from "react";
import styled from "styled-components";

import { X, ArrowRightToLine, Trash2 } from "lucide-react";
import { navKorToEngParsing, navLocalTodos } from "@utils/todoHelpers";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { useSetRecoilState } from "recoil";
import { triggerAtom } from "@utils/atom";
import { getTomorrowDate, Today } from "@utils/date";

interface OepnType {
  idx: number;
  nav: string;
  open?: boolean;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean[] | []>>;
}

export const TodoCheckDown: React.FC<OepnType> = ({ idx, nav, isOpen }) => {
  const getStorageTodos = getLocalStorage("todos");
  const getNavStorageTodos = navLocalTodos(nav);
  const setTrigger = useSetRecoilState(triggerAtom);
  const removeAtIndex = (idx: number) => {
    return getNavStorageTodos.filter((_: any, i: number) => i !== idx);
  };
  console.log(nav);

  // 할 일 취소
  const onCancel = (idx: number) => {
    getNavStorageTodos[idx].cancel = true;
    getNavStorageTodos[idx].date = nav === "내일" ? Today() : getNavStorageTodos[idx].date;
    const remainingTodos = removeAtIndex(idx);

    let newLocalStorage = { ...getStorageTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [navKorToEngParsing(nav)]: remainingTodos,
      [`completed`]: [...newLocalStorage.completed, getNavStorageTodos[idx]],
    };

    setLocalStorage("todos", newLocalStorage);
    setTrigger((prev) => prev + 1);
  };

  // 할 일 미루기
  const onDelay = (idx: number) => {
    const remainingTodos = removeAtIndex(idx);

    let newLocalStorage = { ...getStorageTodos };

    // 미루기 시 날짜 변경
    let tomorrowDate = {
      ...getNavStorageTodos[idx],
      [`date`]: getTomorrowDate(getNavStorageTodos[idx].date),
    };
    let tomorrow = [...newLocalStorage.tomorrow, tomorrowDate]; // 여기만 날짜 변경 필요
    let week = [...newLocalStorage.week, getNavStorageTodos[idx]];
    newLocalStorage = {
      ...newLocalStorage,
      [navKorToEngParsing(nav)]: remainingTodos,
      [nav === "오늘" ? `tomorrow` : `week`]: nav === "오늘" ? tomorrow : week,
    };

    setLocalStorage("todos", newLocalStorage);
    setTrigger((prev) => prev + 1);
  };

  // 할 일 삭제
  const onDelete = (idx: number) => {
    const remainingTodos = removeAtIndex(idx);

    let newLocalStorage = { ...getStorageTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [navKorToEngParsing(nav)]: remainingTodos,
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
          {nav !== "이번주" && (
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
