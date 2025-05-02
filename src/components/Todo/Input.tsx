import React, { useState } from "react";
import styled from "styled-components";

import { NavItem } from "@model/Nav";
import { useSetRecoilState } from "recoil";
import { todosAtom } from "@utils/atom";

interface OwnProps extends Pick<NavItem, "title"> {}
type Filter = "today" | "tomorrow" | "week";

export const Input: React.FC<OwnProps> = ({ title }) => {
  const [inputValue, setInputValue] = useState<string>();
  const setTodos = useSetRecoilState(todosAtom);
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

  const handleKeyDown = (e: React.KeyboardEvent, title: string) => {
    if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
      const filter: Filter = navFilter(title);
      const newTodo = { todo: inputValue, complete: false, cancel: false, date: "20250502" };
      setTodos((prev) => {
        const updated = {
          ...prev,
          [filter]: [...(prev[filter] ?? []), newTodo],
        };
        window.localStorage.setItem("todos", JSON.stringify(updated));
        return updated;
      });
      setInputValue("");
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
