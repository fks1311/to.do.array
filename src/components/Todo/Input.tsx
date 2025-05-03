import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

import { NavItem } from "@model/Nav";
import { initTodosAtom, triggerAtom } from "@utils/atom";
import { setLocalStorage } from "@utils/localStorage";
import { navKorToEngParsing } from "@utils/todoHelpers";

interface OwnProps extends Pick<NavItem, "title"> {}
export const Input: React.FC<OwnProps> = ({ title }) => {
  const [inputValue, setInputValue] = useState<string>();
  const setTodos = useSetRecoilState(initTodosAtom);
  const setTrigger = useSetRecoilState(triggerAtom);

  const handleKeyDown = (e: React.KeyboardEvent, title: string) => {
    if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
      const navEngParsing = navKorToEngParsing(title);
      // Fix: date 수정
      const newTodo = { todo: inputValue, complete: false, cancel: false, date: "20250502" };
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
        onKeyDown={(e) => handleKeyDown(e, title)}
        onChange={onChangeInputValue}
      />
    </Layout>
  );
};

const Layout = styled.div`
  input {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
  }
`;
