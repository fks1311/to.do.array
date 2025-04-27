import { LocalStorage } from "model/locaStorage";
import { NavAtom } from "model/Nav";
import { atom } from "recoil";

export const NavState = atom<NavAtom>({
  key: "navState",
  default: {
    day: "오늘",
    count: 0,
  },
});

export const LocalStorageState = atom<LocalStorage>({
  key: "localStorageState",
  default: {
    today: [{ todo: "", completed: 0, cancel: 0 }],
    tomorrow: [{ todo: "", completed: 0, cancel: 0 }],
    week: [{ todo: "", completed: 0, cancel: 0 }],
    completed: [{ todo: "", completed: 0, cancel: 0 }],
  },
});
