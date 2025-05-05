import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { Header } from "@components/Head";
import { Nav } from "@components/Nav";
import { Timer } from "@components/Timer/Timer";
import { Todo } from "@components/Todo/Todo";
import { basic } from "@model/locaStorage";
import { initTodosAtom, triggerAtom } from "@utils/atom";
import { setLocalStorage } from "@utils/localStorage";

function App() {
  const setTodos = useSetRecoilState(initTodosAtom);
  const trigger = useRecoilValue(triggerAtom);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) {
      setLocalStorage("todos", basic);
      setTodos(basic);
    } else {
      setTodos(JSON.parse(storedTodos));
    }
  }, [trigger]);

  return (
    <Layout>
      <Header />
      <Main>
        <Nav />
        <Timer />
        <Todo />
      </Main>
    </Layout>
  );
}

export default App;

const Layout = styled.div`
  height: 100%;
`;
const Main = styled.main`
  height: 84%;
  display: flex;
`;
