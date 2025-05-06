import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { NavAtom, NavItem } from "@model/Nav";
import { NavState } from "@utils/atom";
import { Sun, Sunset, CalendarRange, CalendarCheck } from "lucide-react";
import { getCompletedTodosByDate, navLocalTodos } from "@utils/todoHelpers";

type NavItemWithPending = NavItem & Pick<NavAtom, "pendingCount">;
export const Nav: React.FC = () => {
  const setCurNav = useSetRecoilState<NavAtom>(NavState);
  const onClickNav = (data: NavAtom) => {
    setCurNav({ nav: data.nav, pendingCount: data.pendingCount, completedCount: getCompletedTodosByDate(data.nav) });
  };
  const navlist: NavItemWithPending[] = [
    { icon: <Sun color="#67AE6E" />, nav: "오늘", pendingCount: navLocalTodos("오늘")?.length ?? 0 },
    { icon: <Sunset color="#E9762B" />, nav: "내일", pendingCount: navLocalTodos("내일")?.length ?? 0 },
    { icon: <CalendarRange color="#8559A5" />, nav: "이번주", pendingCount: navLocalTodos("이번주")?.length ?? 0 },
    { icon: <CalendarCheck color="#1F4068" />, nav: "완료됨", pendingCount: navLocalTodos("완료됨")?.length ?? 0 },
  ];

  return (
    <Layout>
      {navlist.map((data, i) => (
        <NavList key={i} onClick={() => onClickNav(data)}>
          <NavTitle>
            {data.icon}
            <div>{data.nav}</div>
          </NavTitle>
          <TodoCount>{data.pendingCount}</TodoCount>
        </NavList>
      ))}
    </Layout>
  );
};

const Layout = styled.nav`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 1rem;
  border-right: 1px solid ${({ theme: { darkmode } }) => darkmode.divider};
`;

const NavList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const NavTitle = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;
const TodoCount = styled.div``;
