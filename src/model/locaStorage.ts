export interface TodoItem {
  todo: string;
  completed: boolean;
  cancel: number;
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
