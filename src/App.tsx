import styled from "styled-components";
import { Header } from "@components/Head";
import { Nav } from "@components/Nav";
import { Timer } from "@components/Timer/Timer";
import { Todo } from "@components/Todo/Todo";

function App() {
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
