import { atom } from "recoil";
import { NavAtom } from "@model/Nav";
import { basic, LocalStorage } from "@model/locaStorage";

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
    pendingCount: 0,
    completedCount: 0,
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
 * todos 값 변경에 대한 상태 변화를 정의하는 atom입니다.
 *
 * 해당 값은 todo 항목의 상태나 변경 사항을 추적하는 용도로 사용됩니다.
 */
export const triggerAtom = atom<number>({
  key: "triggerState",
  default: 0,
});
