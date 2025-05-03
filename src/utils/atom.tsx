import { atom } from "recoil";
import { NavAtom } from "@model/Nav";
import { basic } from "@model/locaStorage";

export const NavState = atom<NavAtom>({
  key: "navState",
  default: {
    day: "오늘",
    count: 0,
  },
});

export const todosAtom = atom({
  key: "todosState",
  default: basic,
});

export const triggerAtom = atom({
  key: "triggerState",
  default: 0,
});
