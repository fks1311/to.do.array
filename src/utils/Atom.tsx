import { atom } from "recoil";

interface NavType {
  day: string;
  count: number;
}
export const NavState = atom<NavType>({
  key: "navState",
  default: {
    day: "오늘",
    count: 0,
  },
});
