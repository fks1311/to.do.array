import { Electronic } from "@components/Timer/Electronic";
import styled from "styled-components";
import "@styles/font/font.css";

export const Timer = () => {
  return (
    <Layout>
      <Title>POMODORO</Title>
      <Electronic />
    </Layout>
  );
};

const Layout = styled.div`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  gap: 2rem;
  padding: 2.5rem 2rem;
  border-right: 1px solid ${({ theme: { darkmode } }) => darkmode.divider};
`;

const Title = styled.div`
  font-size: 2rem;
  color: white;
  letter-spacing: 10px;
`;
const Circle = styled.div`
  height: 25rem;
  width: 25rem;
  border: 10px solid yellow;
  border-radius: 50%;
`;
