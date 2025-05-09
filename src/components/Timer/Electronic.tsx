import React, { useCallback, useState } from "react";
import styled from "styled-components";
import useInterval from "hooks/useInterval";
import "@styles/font/font.css";

export const Electronic: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const tick = useCallback(() => {
    if (minutes === 0 && seconds === 0) {
      setIsRunning(false);
    } else if (seconds === 0) {
      setMinutes((prev) => prev - 1);
      setSeconds(59);
    } else {
      setSeconds((prev) => prev - 1);
    }
  }, [minutes, seconds]);

  useInterval(isRunning, tick);

  const onReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <Layout>
      <Clock>
        <h2>
          {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
        </h2>
      </Clock>
      <ButtonContainer>
        <div id="inner-container">
          <button onClick={() => setIsRunning(true)}>시작</button>
          <button onClick={() => setIsRunning(false)}>일시정지</button>
        </div>
        <button onClick={() => onReset()}>초기화</button>
      </ButtonContainer>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;
const Clock = styled.div`
  width: 450px;
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
  color: white;
  font-size: 5rem;
  font-family: DS-DIGI;
  border: 1px solid white;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  #inner-container {
    display: flex;
    width: 100%;
    gap: 0.3rem;
    button {
      flex: 1;
    }
  }
  button {
    padding: 1.2rem;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: white;
    &:hover {
      background-color: #f5f7f8;
    }
  }
`;
