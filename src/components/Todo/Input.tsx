import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

import { NavItem } from "@model/Nav";
import { initTodosAtom, triggerAtom } from "@utils/atom";
import { setLocalStorage } from "@utils/localStorage";
import { navKorToEngParsing } from "@utils/todoHelpers";
import { getTomorrowDate, Today } from "@utils/data";

interface OwnProps extends Pick<NavItem, "nav"> {}
export const Input: React.FC<OwnProps> = ({ nav }) => {
  const [inputValue, setInputValue] = useState<string>();
  const setTodos = useSetRecoilState(initTodosAtom);
  const setTrigger = useSetRecoilState(triggerAtom);

  const handleKeyDown = (e: React.KeyboardEvent, nav: string) => {
    if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
      const navEngParsing = navKorToEngParsing(nav);
      const date =
        navEngParsing === "today" ? Today() : navEngParsing === "tomorrow" ? getTomorrowDate(Today()) : Today();
      const newTodo = { todo: inputValue, complete: false, cancel: false, date: date };
      setTodos((prev) => {
        const updated = {
          ...prev,
          [navEngParsing]: [...(prev[navEngParsing] ?? []), newTodo],
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
  input {
    width: 100%;
    padding: 1.3rem 1rem;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
  }
`;
