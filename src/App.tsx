import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { Header } from "@components/Head";
import { Nav } from "@components/Nav";
import { Timer } from "@components/Timer/Timer";
import { Todo } from "@components/Todo/Todo";
import { basic } from "@model/locaStorage";
import { todosAtom } from "@utils/atom";

function App() {
  const setTodos = useSetRecoilState(todosAtom);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (!storedTodos) {
      localStorage.setItem("todos", JSON.stringify(basic));
      setTodos(basic);
    } else {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

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
