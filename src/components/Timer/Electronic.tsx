import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import useInterval from "hooks/useInterval";
import { getLocalStorage, hasLocalStorageKey, setLocalStorage } from "@utils/localStorage";
import { showModal, timeAtom, triggerAtom } from "@utils/atom";
import "@styles/font/font.css";

export const Electronic: React.FC = () => {
  const [{ minutes, seconds }, setTimer] = useRecoilState(timeAtom);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [shouldContinue, setShouldContinue] = useState<boolean>(false);
  const setTrigger = useSetRecoilState(triggerAtom);
  const setIsModalOpen = useSetRecoilState(showModal);

  // localStorageTimer 초기값 설정
  useEffect(() => {
    const getStorageTimer = getLocalStorage("timer");
    if (hasLocalStorageKey("timer") === false) {
      setLocalStorage("timer", { _minutes: minutes, _seconds: seconds, today: 0, weekend: 0 });
    } else {
      setLocalStorage("timer", getStorageTimer);
    }
  }, []);

  // 초 시간
  const tick = useCallback(() => {
    if (minutes === 0 && seconds === 0) {
      setIsRunning(false);
    } else if (seconds === 0) {
      setTimer((prev) => ({
        ...prev,
        minutes: prev.minutes - 1,
        seconds: 59,
      }));
    } else {
      setTimer((prev) => ({
        ...prev,
        seconds: prev.seconds - 1,
      }));
    }
  }, [minutes, seconds]);

  useInterval(isRunning, tick);

  // 오늘 완료한 시간을 배열로 저장[일주일]

  // 완전 정지
  const handleStop = () => {
    const defaultMinutes = getLocalStorage("timer")?._minutes;

    // 오늘 완료한 시간
    let current = defaultMinutes - (minutes + 1);
    current = isNaN(current) ? 0 : current;
    let defaultToday = getLocalStorage("timer")?.today;
    defaultToday += current;

    // 이번주 완료한 시간
    let defaultWeekend = getLocalStorage("timer")?.weekend;
    defaultWeekend += current;

    let newDuration = {
      ...getLocalStorage("timer"),
      today: defaultToday < 0 ? 0 : defaultToday,
      weekend: defaultWeekend < 0 ? 0 : defaultWeekend,
    };

    setLocalStorage("timer", newDuration);
    setTrigger((prev) => prev + 1);
    setIsRunning(false);
    setShouldContinue(false);
    setTimer({ minutes: 25, seconds: 0 });
  };

  return (
    <Layout>
      <Clock onClick={() => setIsModalOpen(true)}>
        <h2>
          {String(minutes).padStart(2, "0")} : {String(seconds).padStart(2, "0")}
        </h2>
      </Clock>
      <ButtonContainer>
        {!isRunning && !shouldContinue && <button onClick={() => setIsRunning(true)}>집중 시작하기</button>}
        {isRunning && (
          <button
            onClick={() => {
              setIsRunning(false);
              setShouldContinue(true);
            }}
          >
            일시 정지
          </button>
        )}
        {shouldContinue && !isRunning && (
          <>
            <button onClick={() => setIsRunning(true)}>계속</button>
            <button onClick={handleStop}>정지</button>
          </>
        )}
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
  cursor: pointer;
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
    border-radius: 10px;
    background-color: white;
    &:hover {
      color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
      background-color: ${({ theme: { darkmode } }) => darkmode.bg};
      border: 1px solid ${({ theme: { darkmode } }) => darkmode.txt_primary};
    }
  }
`;
