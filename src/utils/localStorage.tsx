// localstroage 파싱
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

// localstorage 데이터 저장
export const setLocalStorage = (key: string) => {};

export const useLocalStorageSync = () => {};
