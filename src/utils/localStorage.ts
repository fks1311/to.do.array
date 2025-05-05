/**
 * localStorage에 있는 항목을 꺼냅니다.
 */
export const getLocalStorage = (key: string) => {
  try {
    const storedTodos = localStorage.getItem(key);
    if (!storedTodos) throw new Error(`${key} not found in localStorage`);
    return JSON.parse(storedTodos);
  } catch (e) {
    console.log(`${key} paring error >> `, e);
    return [];
  }
};

/**
 * localStorage에 key명으로 데이터를 저장합니다.
 */
export const setLocalStorage = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`${key} 저장 중 에러 발생 >> `, error);
  }
};
