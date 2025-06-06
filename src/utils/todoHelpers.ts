import { TodoItem } from "@model/locaStorage";
import { getLocalStorage } from "./localStorage";
import { getTomorrowDate, Today } from "./date";

/**
 * 한글로 들어오는 nav 항목을 영어로 파싱합니다.
 * @param {string} nav - 한글로 들어오는 nav 항목
 */

type Filter = "today" | "tomorrow" | "week" | "completed";
export const navKorToEngParsing = (nav: string): Filter => {
  const navFilter = (nav: string) => {
    switch (nav) {
      case "오늘":
        return "today";
      case "내일":
        return "tomorrow";
      case "이번주":
        return "week";
      case "완료됨":
        return "completed";
      default:
        return "today";
    }
  };

  return navFilter(nav);
};

/**
 * 현재 선택된 네비 항목(nav)에 해당하는 localStorage의 할 일 목록을 반환합니다.
 * @param nav
 * @returns 해당 항목에 저장된 할 일 목록 배열
 */
export const navLocalTodos = (nav: string): TodoItem[] => {
  const getLocalTodos = getLocalStorage("todos");
  const day = navKorToEngParsing(nav);

  return getLocalTodos[day];
};

/**
 * Nav별 완료한 작업 목록 갯수를 반환합니다.
 *
 * @param nav
 * @returns {number} nav별 완료한 작업 목록 갯수
 */
export const getCompletedTodosByDate = (nav: string): number => {
  const getCompletedLocalTodos = getLocalStorage("todos")?.completed ?? [];
  const curNav = nav === "오늘" ? Today() : nav === "내일" ? getTomorrowDate(Today()) : "";

  const navCompletedTodos = curNav
    ? getCompletedLocalTodos.filter((data: { date: string }) => data.date === curNav)
    : getCompletedLocalTodos;
  return navCompletedTodos?.length;
};
