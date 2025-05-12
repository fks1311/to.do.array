import { atom } from "recoil";
import { NavAtom } from "@model/Nav";
import { basic, LocalStorage } from "@model/locaStorage";
import { getCompletedTodosByDate, navLocalTodos } from "./todoHelpers";
import { EditableState, TimeState } from "@model/stateTodo";

/**
 * 네비게이션 상태(atom)를 정의합니다.
 *
 * 현재 선택된 날짜 필터(day)와 해당 항목의 할 일 개수(count)를 저장합니다.
 * @type {NavAtom}
 * @default
 * {
 *    nav:string;
 *    pendingCount:number;
 *    completedCount?:number;
 * }
 */
export const NavState = atom<NavAtom>({
  key: "navState",
  default: {
    nav: "오늘",
    pendingCount: navLocalTodos("오늘")?.length ?? 0,
    completedCount: getCompletedTodosByDate("오늘"),
  },
});

/**
 * todos의 초기 상태(atom)를 정의합니다.
 * @type {LocalStorage}
 * @default
 * {
 *    today?: TodoItem[];
 *    tomorrow?: TodoItem[];
 *    week?: TodoItem[];
 *    completed?: TodoItem[];
 * }
 */
export const initTodosAtom = atom<LocalStorage>({
  key: "initTodosState",
  default: basic,
});

/**
 * todos 값 변경에 대한 상태 변화를 정의합니다.
 *
 * 해당 값은 todo 항목의 상태나 변경 사항을 추적하는 용도로 사용됩니다.
 */
export const triggerAtom = atom<number>({
  key: "triggerState",
  default: 0,
});

/**
 * 할 일 목록 입력 상태 변화를 정의합니다.
 * @type {EditableState}
 * @default
 * {
 *    idx: number | null;
 *    isSelect: boolean;
 * }
 */
export const editableAtom = atom<EditableState>({
  key: "editableState",
  default: { idx: null, isSelect: false },
});

/**
 * 타이머 초기값을 정의합니다.
 * @type {TimeState}
 * @default
 * {
 *    minutes: number;
 *    seconds: number;
 * }
 */
export const timeAtom = atom<TimeState>({
  key: "timeState",
  default: { minutes: 25, seconds: 0 },
});
