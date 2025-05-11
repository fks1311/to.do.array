import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { getLocalStorage, setLocalStorage } from "@utils/localStorage";
import { CircleCheckBig, CircleX, Trash2 } from "lucide-react";
import { CheckTodo, Content, Todo } from "./List";
import { Today } from "@utils/date";
import { triggerAtom } from "@utils/atom";
import { TodoItem } from "@model/locaStorage";

/**
 * 완료됨
 *
 * 1. 컴포넌트 생성
 * 2. 완료됨 -> 오늘 날짜로 이동
 * 3. 취소됨 -> 오늘 날짜로 이동
 * 4. 옵션 : 미루기 삭제
 * 5. 완료/취소 버튼 ui 변경
 * 6. 삭제
 */
type TodoItemWithoutDate = Omit<TodoItem, "date">;
export const CompletedList: React.FC = () => {
  const getStorageTodos = getLocalStorage("todos");
  const getStorageCompletedTodos = getLocalStorage("todos")?.completed ?? [];
  const setTrigger = useSetRecoilState(triggerAtom);
  const removeAtIndex = (idx: number) => {
    return getStorageCompletedTodos.filter((_: any, i: number) => i !== idx);
  };

  /**
   * 전체 항목 가져오고
   * 그 중 선택된 것만 수정
   *  complete:false / cancel:false
   *  today로 옮기기
   */
  const onClickUpdate = (idx: number, nav: string) => {
    // 남은 할 일
    let remainingTodos = removeAtIndex(idx);

    // 현재 선택된 할 일 상태 변경
    let updateStatus = {
      ...getStorageCompletedTodos[idx],
      [`${nav}`]: !getStorageCompletedTodos[idx][`${nav}`],
      date: Today(),
    };

    const newLocalStorage = {
      ...getStorageTodos,
      today: [...(getStorageTodos?.today ?? []), updateStatus],
      completed: remainingTodos,
    };

    setLocalStorage("todos", newLocalStorage);
    setTrigger((prev) => prev + 1);
  };

  // 할 일 삭제
  const onDelete = (idx: number) => {
    let remainingTodos = removeAtIndex(idx);

    const newLocalStorage = {
      ...getStorageTodos,
      completed: remainingTodos,
    };

    setLocalStorage("todos", newLocalStorage);
    setTrigger((prev) => prev + 1);
  };

  return (
    <Layout>
      <Content>
        {getStorageCompletedTodos?.map(
          (todo: { complete: boolean; cancel: boolean; todo: string; date: string }, idx: number) => {
            const [_, month, day] = todo.date.split("-");
            return (
              <Todo key={idx}>
                <CheckTodo>
                  {todo.complete && <CircleCheckBig color="#006A71" onClick={() => onClickUpdate(idx, "complete")} />}
                  {todo.cancel && <CircleX color="#820300" onClick={() => onClickUpdate(idx, "cancel")} />}
                  {todo.todo}
                </CheckTodo>
                <RightAlign>
                  {month}월 {day}일
                  <Trash2 size={20} onClick={() => onDelete(idx)} />
                </RightAlign>
              </Todo>
            );
          }
        )}
      </Content>
    </Layout>
  );
};

const Layout = styled.div``;
const RightAlign = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
`;
