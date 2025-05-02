import { getLocalStorage } from "./localStorage";

export const navEngParsing = (title: string) => {
  const navFilter = (title: string) => {
    switch (title) {
      case "오늘":
        return "today";
      case "내일":
        return "tomorrow";
      case "이번주":
        return "week";
      default:
        return "today";
    }
  };

  return navFilter(title);
};

export const titleLocalTodos = (title: string) => {
  const getLocalTodos = getLocalStorage("todos");
  const day = navEngParsing(title);

  return getLocalTodos[day];
};
