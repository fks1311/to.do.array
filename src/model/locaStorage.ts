export interface TodoItem {
  todo: string;
  complete: boolean;
  cancel: boolean;
  date: string;
}

export interface LocalStorage {
  today?: TodoItem[];
  tomorrow?: TodoItem[];
  week?: TodoItem[];
  completed?: TodoItem[];
}

export const basic: LocalStorage = {
  today: [],
  tomorrow: [],
  week: [],
  completed: [],
};
