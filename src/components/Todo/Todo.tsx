import styled from "styled-components";
import { Total } from "./Total";
import { Input } from "./Input";

export const Todo = () => {
  return (
    <Layout>
      <p>오늘</p>
      <div>
        <Total />
        <Input />
      </div>
    </Layout>
  );
};

const Layout = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
  p {
    color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
  }
`;
