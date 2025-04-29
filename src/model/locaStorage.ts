interface TodoItem {
  todo: string;
  completed: number;
  cancel: number;
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
