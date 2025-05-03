import { TodoItem } from "@model/locaStorage";
import { getLocalStorage } from "./localStorage";

/**
 * 한글로 들어오는 nav 항목을 영어로 파싱합니다.
 * @param {string} title - 한글로 들어오는 nav 항목
 */

type Filter = "today" | "tomorrow" | "week" | "completed";
export const navKorToEngParsing = (title: string): Filter => {
  const navFilter = (title: string) => {
    switch (title) {
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

  return navFilter(title);
};

/**
 * 현재 선택된 네비 항목(title)에 해당하는 localStorage의 할 일 목록을 반환합니다.
 * @param title
 * @returns 해당 항목에 저장된 할 일 목록 배열
 */
export const titleLocalTodos = (title: string): TodoItem[] => {
  const getLocalTodos = getLocalStorage("todos");
  const day = navKorToEngParsing(title);

  return getLocalTodos[day];
};
