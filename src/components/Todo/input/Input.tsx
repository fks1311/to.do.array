import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

import { NavItem } from "@model/Nav";
import { initTodosAtom, triggerAtom } from "@utils/atom";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { navKorToEngParsing } from "@utils/todoHelpers";
import { getTomorrowDate, Today } from "@utils/date";
import { EditableState } from "@model/stateTodo";

interface OwnProps extends Pick<NavItem, "nav"> {
  editable: EditableState;
  setEditable: React.Dispatch<React.SetStateAction<EditableState>>;
}
export const Input: React.FC<OwnProps> = ({ nav, editable, setEditable }) => {
  const [inputValue, setInputValue] = useState<string>(
    (editable.idx !== null && getLocalStorage("todos")?.[navKorToEngParsing(nav)]?.[editable.idx])?.todo ?? 0
  );
  const setTodos = useSetRecoilState(initTodosAtom);
  const setTrigger = useSetRecoilState(triggerAtom);

  const handleKeyDown = (e: React.KeyboardEvent, nav: string) => {
    const navKey = navKorToEngParsing(nav);

    if (e.code === "Enter" && e.nativeEvent.isComposing === false && editable.idx !== null) {
      const localStorageTodos = getLocalStorage("todos")?.[navKey] ?? [];
      // 입력된 todo 내용 수정
      const updateInput = localStorageTodos.map((data: {}, i: number) => {
        return i === editable.idx ? { ...data, todo: inputValue } : data;
      });

      setTodos((prev) => {
        const updated = {
          ...prev,
          [navKey]: updateInput,
        };
        setLocalStorage("todos", updated);
        return updated;
      });
      setTrigger((prev) => prev + 1);
      setEditable({ idx: null, isSelect: false });
    } else if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
      // 새로운 todo 추가
      if (!inputValue?.trim()) return; // 공백이거나 미입력 방지

      const date = navKey === "today" ? Today() : navKey === "tomorrow" ? getTomorrowDate(Today()) : Today();
      const newTodo = { todo: inputValue, complete: false, cancel: false, date: date };
      setTodos((prev) => {
        const updated = {
          ...prev,
          [navKey]: [...(prev[navKey] ?? []), newTodo],
        };
        setLocalStorage("todos", updated);
        return updated;
      });
      setInputValue("");
      setTrigger((prev) => prev + 1);
    }
  };

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Layout>
      <input
        value={inputValue || ""}
        placeholder="엔터키를 눌러 작업을 추가합니다."
        onKeyDown={(e) => handleKeyDown(e, nav)}
        onChange={onChangeInputValue}
      />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  input {
    width: 100%;
    padding: 1.3rem 1rem;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
  }
`;
