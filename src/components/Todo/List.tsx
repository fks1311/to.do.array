import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { NavItem } from "@model/Nav";
import { TodoItem } from "@model/locaStorage";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { Circle, ChevronDown } from "lucide-react";
import { TodoCheckDown } from "./button/TodoCheckDown";
import { navKorToEngParsing } from "@utils/todoHelpers";
import { triggerAtom } from "@utils/atom";
import { Today } from "@utils/date";
import { Input } from "./input/Input";
import { EditableState } from "@model/stateTodo";

interface OwnProps extends Pick<NavItem, "nav"> {
  editable: EditableState;
  setEditable: React.Dispatch<React.SetStateAction<EditableState>>;
}
interface TodoStyleProps {
  $edit?: number | null;
  idx?: number;
}
export const List: React.FC<OwnProps> = ({ nav, editable, setEditable }) => {
  const getStorageTodos = getLocalStorage("todos");
  const day = navKorToEngParsing(nav);
  const [list, setList] = useState<TodoItem[]>([]); // 현재 nav의 할 일 목록
  const [complete, setComplete] = useState<TodoItem[]>(getStorageTodos?.completed ?? []); // 할 일 목록 완료 여부
  const [isOpen, setIsOpen] = useState<boolean[] | []>([]); // 상태변경(취소, 미루기, 삭제) 버튼 UI 활성화
  const [trigger, setTrigger] = useRecoilState(triggerAtom);

  useEffect(() => {
    // todo list 렌더링
    setList(getStorageTodos[day]);

    // nav에 따라 Array.from 배열 생성(완료/미루기/취소 관련)
    const todos = getStorageTodos?.[day];
    const newIsOpenArray = Array.from({ length: todos?.length }, () => false);
    setIsOpen(newIsOpenArray);
  }, [nav, trigger]);

  // 할 일 완료
  const onCompleted = (idx: number) => {
    // 선택된 객체 제외한 나머지 할 일 목록
    let filterArray = list.filter((_, i) => i !== idx);
    setList(filterArray);

    // 상태 변경(완료, 취소, 미루기) 배열 목록
    const updatedComplete = [
      ...complete,
      (list[idx] = {
        ...list[idx],
        date: nav === "내일" ? Today() : list[idx].date,
        complete: !list[idx].complete,
      }),
    ];
    setComplete(updatedComplete);

    // 상태 변경 객체 요소 completed로 옮기기
    let newLocalStorage = { ...getStorageTodos };
    newLocalStorage = {
      ...newLocalStorage,
      [`${navKorToEngParsing(nav)}`]: filterArray,
      completed: updatedComplete,
    };

    setLocalStorage("todos", newLocalStorage);
    setTrigger((prev) => prev + 1);
  };

  // 옵션 버튼 UI
  const onClickOpen = (idx: number) => {
    setIsOpen((prev) => {
      const newOpen = [...prev];
      newOpen[idx] = !newOpen[idx];
      return newOpen;
    });
  };

  const handleEditIndex = (idx: number) => {
    setEditable({ idx: idx, isSelect: true });
  };
  return (
    <Layout>
      <p>할 일</p>
      <Content>
        {list?.map((todo, idx) => (
          <Todo key={idx} $edit={editable.idx} idx={idx} onClick={() => handleEditIndex(idx)}>
            {editable.isSelect && editable.idx === idx ? (
              <Input nav={nav} editable={editable} setEditable={setEditable} />
            ) : (
              <>
                <CheckTodo onClick={() => handleEditIndex(idx)}>
                  {!todo.complete && <Circle size={20} color="#3674B5" onClick={() => onCompleted(idx)} />}
                  {todo.todo}
                </CheckTodo>
                <ChevronDown onClick={() => onClickOpen(idx)} />
                <TodoCheckDown idx={idx} nav={nav} isOpen={isOpen[idx]} setIsOpen={setIsOpen} />
              </>
            )}
          </Todo>
        ))}
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  p {
    color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const Todo = styled.div<TodoStyleProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: ${({ $edit, idx }) => ($edit === idx ? "0px" : "1rem 1rem 1rem 10px")};
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
`;
export const CheckTodo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// padding: ${({ $edit, idx }) => ($edit === idx ? "0px" : "1rem 1rem 1rem 10px")};
// ${({ $edit, idx }) => ($edit === idx ? `padding: 0px;` : `padding: 1rem 1rem 1rem 10px;`)}
// padding: 1rem 1rem 1rem 10px;
