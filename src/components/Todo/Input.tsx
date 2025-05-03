import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

import { NavItem } from "@model/Nav";
import { todosAtom, triggerAtom } from "@utils/atom";
import { setLocalStorage } from "@utils/localStorage";
import { navEngParsing } from "@utils/todoHelpers";

interface OwnProps extends Pick<NavItem, "title"> {}
type Filter = "today" | "tomorrow" | "week";

export const Input: React.FC<OwnProps> = ({ title }) => {
  const [inputValue, setInputValue] = useState<string>();
  const setTodos = useSetRecoilState(todosAtom);
  const setTrigger = useSetRecoilState(triggerAtom);

  const handleKeyDown = (e: React.KeyboardEvent, title: string) => {
    if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
      const filter: Filter = navEngParsing(title);
      const newTodo = { todo: inputValue, complete: false, cancel: false, date: "20250502" };
      setTodos((prev) => {
        const updated = {
          ...prev,
          [filter]: [...(prev[filter] ?? []), newTodo],
        };
        setLocalStorage("todos", updated);
        return updated;
      });
      setInputValue("");
      setTrigger((prev) => prev + 1);
    }
  };

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Layout>
      <input
        value={inputValue || ""}
        placeholder="엔터키를 눌러 작업을 추가합니다."
        onKeyDown={(e) => handleKeyDown(e, title)}
        onChange={onChangeTodo}
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
