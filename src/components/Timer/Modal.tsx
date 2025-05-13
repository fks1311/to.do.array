import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalLayout } from "layout/ModalLayout";
import { showModal, timeAtom } from "@utils/atom";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { motion } from "framer-motion";

export const Modal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(showModal);
  const [{ minutes, seconds }, setTimer] = useRecoilState(timeAtom);
  const getStorageTimer = getLocalStorage("timer");

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTimer((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSave = () => {
    const newTimer = {
      ...getStorageTimer,
      _minutes: minutes,
      _seconds: seconds,
    };
    if (minutes >= 100 || seconds >= 100) {
      alert("100 분/초를 초과할 수 없습니다.");
      return;
    }
    setLocalStorage("timer", newTimer);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    const newTimer = {
      ...getStorageTimer,
      _minutes: 25,
      _seconds: 0,
    };
    setIsModalOpen(false);
    setTimer({ minutes: 25, seconds: 0 });
    setLocalStorage("timer", newTimer);
  };

  const variants = {
    init: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      {isModalOpen && (
        <ModalLayout>
          <Layout variants={variants} initial="init" animate="animate">
            <Title>타이머 설정</Title>
            <TimerLayout>
              <Timer>{minutes}</Timer> : <Timer>{String(seconds).padStart(2, "0")}</Timer>
            </TimerLayout>
            <TimerSettingLayout>
              <div>
                분 : <input name="minutes" type="number" value={minutes.toString()} onChange={onChangeInputValue} />
              </div>
              <div>
                초 : <input name="seconds" type="number" value={seconds.toString()} onChange={onChangeInputValue} />
              </div>
            </TimerSettingLayout>
            <ButtonContainer>
              <button onClick={handleCancel}>취소</button>
              <button onClick={handleSave}>설정</button>
            </ButtonContainer>
          </Layout>
        </ModalLayout>
      )}
    </>
  );
};

const Layout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 40%;
  height: 50%;
  padding: 2rem;
  border-radius: 10px;
  background-color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
`;
const Title = styled.div`
  font-size: 2rem;
`;
const TimerLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 6rem;
  border: 2px solid ${({ theme: { darkmode } }) => darkmode.bg};
  border-radius: 10px;
`;
const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  font-family: DS-DIGI;
`;
const TimerSettingLayout = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  input {
    padding: 0.3rem;
    border-radius: 5px;
    border: 1px solid ${({ theme: { darkmode } }) => darkmode.bg};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  button {
    padding: 0.6rem 2rem;
    border: 0;
    border-radius: 10px;
    background-color: #eeeeee;
    cursor: pointer;
    &:hover {
      color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
      background-color: ${({ theme: { darkmode } }) => darkmode.bg};
    }
  }
`;
